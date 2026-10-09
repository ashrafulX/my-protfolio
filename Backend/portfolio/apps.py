from django.apps import AppConfig


class PortfolioConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "portfolio"

    def ready(self):
        try:
            from cloudinary import CloudinaryResource
            from cloudinary.models import CloudinaryField
            from django.core.files.uploadedfile import UploadedFile

            def safe_str(self):
                val = getattr(self, "public_id", None)
                return str(val) if val is not None else ""

            def safe_bool(self):
                return bool(getattr(self, "public_id", None))

            def safe_from_db_value(self, value, expression, connection, *args, **kwargs):
                if value:
                    return self.parse_cloudinary_resource(value)
                return None

            def safe_to_python(self, value):
                if not value:
                    return None
                if isinstance(value, (CloudinaryResource, UploadedFile)):
                    return value
                return self.parse_cloudinary_resource(value)

            def safe_get_prep_value(self, value):
                if not value:
                    return ""
                if isinstance(value, CloudinaryResource):
                    return value.get_prep_value() or ""
                return str(value)

            CloudinaryResource.__str__ = safe_str
            CloudinaryResource.__bool__ = safe_bool
            CloudinaryField.from_db_value = safe_from_db_value
            CloudinaryField.to_python = safe_to_python
            CloudinaryField.get_prep_value = safe_get_prep_value
        except Exception:
            pass

