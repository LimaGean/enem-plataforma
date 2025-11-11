from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from diagnostico.models import PlanoDeEnsino
from diagnostico.serializers import PlanoDeEnsinoSerializer


class PlanoDeEnsinoAlunoView(generics.ListAPIView):
    """
    View para listar os planos de ensino do aluno autenticado.
    """
    serializer_class = PlanoDeEnsinoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retorna apenas os planos do usuário autenticado"""
        return PlanoDeEnsino.objects.filter(
            diagnostico__usuario=self.request.user
        ).select_related('competencia', 'diagnostico')
