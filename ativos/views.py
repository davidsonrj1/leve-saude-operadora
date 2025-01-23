from rest_framework import viewsets
from .models import Ativo
from .serializers import AtivoSerializer

class AtivoViewSet(viewsets.ModelViewSet):
    queryset = Ativo.objects.all()
    serializer_class = AtivoSerializer
