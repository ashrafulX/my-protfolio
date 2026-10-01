from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.views import serve as serve_static
from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import RedirectView

urlpatterns = [
    path("favicon.ico", RedirectView.as_view(url=f"{settings.FRONTEND_URL}/favicon.ico", permanent=False)),
    path("static/<path:path>", serve_static, {"insecure": True}),
    path("admin/", admin.site.urls),
    path("api/", include("portfolio.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
