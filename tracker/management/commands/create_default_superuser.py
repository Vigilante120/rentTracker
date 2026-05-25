from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Create the default superuser if it does not exist."

    def handle(self, *args, **options):
        User = get_user_model()
        email = getattr(settings, "DEFAULT_SUPERUSER_EMAIL", None)
        password = getattr(settings, "DEFAULT_SUPERUSER_PASSWORD", None)
        if not email or not password:
            self.stdout.write(self.style.WARNING("Default superuser credentials not set."))
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.SUCCESS("Default superuser already exists."))
            return

        User.objects.create_superuser(email=email, password=password)
        self.stdout.write(self.style.SUCCESS("Default superuser created."))
