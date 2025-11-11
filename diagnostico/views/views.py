from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from diagnostico.models import DiagnosticoRealizado
from diagnostico.serializers import RespostaDiagnosticoSerializer
from diagnostico.services.services import gerar_plano


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def receber_respostas(request):
    """
    Recebe as respostas do diagnóstico, salva no banco e gera o plano de ensino.
    """
    serializer = RespostaDiagnosticoSerializer(data=request.data)

    if serializer.is_valid():
        respostas = serializer.validated_data['respostas']

        # Salvar o diagnóstico no banco de dados
        diagnostico = DiagnosticoRealizado.objects.create(
            usuario=request.user,
            respostas=respostas
        )

        # Gerar plano de ensino baseado nas respostas
        gerar_plano(diagnostico)

        return Response({
            "mensagem": "Diagnóstico salvo e plano de ensino gerado com sucesso!",
            "diagnostico_id": diagnostico.id
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
