from rest_framework import viewsets
from .models import Ativo
from .serializers import AtivoSerializer
from rest_framework.permissions import IsAuthenticated

class AtivoViewSet(viewsets.ModelViewSet):
    queryset = Ativo.objects.all()
    serializer_class = AtivoSerializer
    permission_classes = [IsAuthenticated]
