from django.contrib import admin
from django.urls import path, include, re_path
from .views import index_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/diagnostico/', include('diagnostico.urls')),

    # Serve React frontend para todas as outras rotas
    re_path(r'^.*$', index_view, name='index'),
]
