from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AtivoViewSet

router = DefaultRouter()
router.register(r'ativos', AtivoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
