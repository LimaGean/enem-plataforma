from rest_framework import serializers
from diagnostico.models import DiagnosticoRealizado, Competencia, PlanoDeEnsino


class RespostaDiagnosticoSerializer(serializers.Serializer):
    """Serializer para receber respostas do diagnóstico"""
    respostas = serializers.ListField(
        child=serializers.IntegerField(),
        help_text="Lista de respostas do aluno (0 ou 1)"
    )

    def validate_respostas(self, value):
        """Valida se as respostas são apenas 0 ou 1"""
        for resposta in value:
            if resposta not in [0, 1]:
                raise serializers.ValidationError(
                    "Cada resposta deve ser 0 ou 1"
                )
        return value


class DiagnosticoRealizadoSerializer(serializers.ModelSerializer):
    """Serializer para o modelo DiagnosticoRealizado"""
    usuario_username = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = DiagnosticoRealizado
        fields = ['id', 'usuario', 'usuario_username', 'data_realizacao', 'respostas']
        read_only_fields = ['id', 'data_realizacao']


class CompetenciaSerializer(serializers.ModelSerializer):
    """Serializer para o modelo Competencia"""
    area_display = serializers.CharField(source='get_area_display', read_only=True)

    class Meta:
        model = Competencia
        fields = ['id', 'codigo', 'descricao', 'area', 'area_display']


class PlanoDeEnsinoSerializer(serializers.ModelSerializer):
    """Serializer para o modelo PlanoDeEnsino"""
    competencia = CompetenciaSerializer(read_only=True)
    prioridade_display = serializers.CharField(source='get_prioridade_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = PlanoDeEnsino
        fields = [
            'id',
            'diagnostico',
            'competencia',
            'prioridade',
            'prioridade_display',
            'status',
            'status_display',
            'recomendacao',
            'data_criacao',
            'data_atualizacao',
        ]
        read_only_fields = ['id', 'data_criacao', 'data_atualizacao']
