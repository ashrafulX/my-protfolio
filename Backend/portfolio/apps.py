from django.apps import AppConfig


class PortfolioConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "portfolio"

    def ready(self):
        try:
            from cloudinary import CloudinaryResource

            def safe_str(self):
                val = getattr(self, "public_id", None)
                return str(val) if val is not None else ""

            CloudinaryResource.__str__ = safe_str
        except Exception:
            pass

