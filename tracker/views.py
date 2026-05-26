import logging
import random

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework import status, viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import EmailOTP, OwedMoney, OwedMoneyHistory, RentItem
from .serializers import (
    GoogleLoginSerializer,
    LoginSerializer,
    OwedMoneySerializer,
    OwedMoneyHistorySerializer,
    RentItemSerializer,
    SignupSerializer,
    VerifyOTPSerializer,
)

User = get_user_model()
logger = logging.getLogger(__name__)


def _generate_otp():
    return f"{random.randint(100000, 999999)}"


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"].lower()
        password = serializer.validated_data["password"]
        full_name = serializer.validated_data.get("full_name", "")

        if User.objects.filter(email=email).exists():
            return Response({"detail": "Email already in use."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            user = User.objects.create_user(email=email, password=password, full_name=full_name, is_active=False)
            code = _generate_otp()
            EmailOTP.objects.create(user=user, code=code)

        send_mail(
            subject="Your RentTrack verification code",
            message=f"Your verification code is {code}. It expires in 10 minutes.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({"detail": "Verification code sent."}, status=status.HTTP_201_CREATED)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"].lower()
        code = serializer.validated_data["code"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Invalid email or code."}, status=status.HTTP_400_BAD_REQUEST)

        otp = (
            EmailOTP.objects.filter(user=user, code=code, is_used=False)
            .order_by("-created_at")
            .first()
        )

        if not otp or otp.is_expired():
            return Response({"detail": "Invalid or expired code."}, status=status.HTTP_400_BAD_REQUEST)

        otp.is_used = True
        otp.save(update_fields=["is_used"])
        user.is_active = True
        user.save(update_fields=["is_active"])

        refresh = RefreshToken.for_user(user)

        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh)},
            status=status.HTTP_200_OK,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"].lower()
        password = serializer.validated_data["password"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            return Response({"detail": "Account not verified."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh)},
            status=status.HTTP_200_OK,
        )


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token_value = serializer.validated_data["id_token"]

        try:
            id_info = id_token.verify_oauth2_token(
                token_value,
                requests.Request(),
                settings.GOOGLE_OAUTH_CLIENT_ID,
            )
        except ValueError:
            return Response({"detail": "Invalid Google token."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            logger.exception("Google token verification failed")
            return Response({"detail": "Google login failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        email = id_info.get("email", "").lower()
        if not email:
            return Response({"detail": "Email not available from Google."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user, _ = User.objects.get_or_create(email=email, defaults={"is_active": True})
        except Exception:
            logger.exception("Google login user lookup/create failed")
            return Response({"detail": "Google login failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if not user.is_active:
            user.is_active = True
            user.save(update_fields=["is_active"])

        refresh = RefreshToken.for_user(user)
        return Response(
            {"access": str(refresh.access_token), "refresh": str(refresh)},
            status=status.HTTP_200_OK,
        )


class RentItemViewSet(viewsets.ModelViewSet):
    serializer_class = RentItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RentItem.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OwedMoneyViewSet(viewsets.ModelViewSet):
    serializer_class = OwedMoneySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        include_cleared = self.request.query_params.get("include_cleared") == "1"
        queryset = OwedMoney.objects.filter(user=self.request.user)
        if not include_cleared:
            queryset = queryset.filter(is_cleared=False)
        return queryset.order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        was_cleared = serializer.instance.is_cleared
        instance = serializer.save()
        if not was_cleared and instance.is_cleared:
            OwedMoneyHistory.objects.create(
                user=self.request.user,
                owed_money=instance,
                name=instance.name,
                number=instance.number,
                amount=instance.amount,
            )


class OwedMoneyHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OwedMoneyHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OwedMoneyHistory.objects.filter(user=self.request.user).order_by("-cleared_at")
