from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    GoogleLoginView,
    LoginView,
    OwedMoneyHistoryViewSet,
    OwedMoneyViewSet,
    RentItemViewSet,
    SignupView,
    VerifyOTPView,
)

router = DefaultRouter()
router.register("rent-items", RentItemViewSet, basename="rent-items")
router.register("owed-money", OwedMoneyViewSet, basename="owed-money")
router.register("owed-money-history", OwedMoneyHistoryViewSet, basename="owed-money-history")

urlpatterns = [
    path("auth/signup/", SignupView.as_view(), name="signup"),
    path("auth/verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/google/", GoogleLoginView.as_view(), name="google-login"),
    path("", include(router.urls)),
]
