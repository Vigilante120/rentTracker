from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import RentItem, OwedMoney

User = get_user_model()


class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    full_name = serializers.CharField(required=False, allow_blank=True)


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(min_length=6, max_length=6)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class GoogleLoginSerializer(serializers.Serializer):
    id_token = serializers.CharField()


class RentItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentItem
        fields = [
            "id",
            "name",
            "number",
            "product_detail",
            "rent_duration_minutes",
            "end_date",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["id", "end_date", "created_at"]


class OwedMoneySerializer(serializers.ModelSerializer):
    class Meta:
        model = OwedMoney
        fields = ["id", "name", "number", "amount", "is_cleared", "created_at"]
        read_only_fields = ["id", "created_at"]
