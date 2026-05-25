from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models.signals import post_migrate
from django.dispatch import receiver

User = get_user_model()


@receiver(post_migrate)
def create_default_superuser(sender, **kwargs):
    email = getattr(settings, "DEFAULT_SUPERUSER_EMAIL", None)
    password = getattr(settings, "DEFAULT_SUPERUSER_PASSWORD", None)
    if not email or not password:
        return

    if User.objects.filter(email=email).exists():
        return

    User.objects.create_superuser(email=email, password=password)
