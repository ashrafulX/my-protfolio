from django.apps import AppConfig


class PortfolioConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "portfolio"

    def ready(self):
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute(
                    "ALTER TABLE portfolio_blogpost ALTER COLUMN featured_image DROP NOT NULL;"
                )
        except Exception:
            pass

