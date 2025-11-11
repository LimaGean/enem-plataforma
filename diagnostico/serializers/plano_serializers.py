from rest_framework import serializers
from diagnostico.models.plano import PlanoDeEnsino

class PlanoDeEnsinoSerializer(serializers.ModelSerializer):
    competencia_codigo = serializers.CharField(source='competencia.codigo', read_only=True)
    competencia_descricao = serializers.CharField(source='competencia.descricao', read_only=True)

    class Meta:
        model = PlanoDeEnsino
        fields = ['id', 'competencia_codigo', 'competencia_descricao', 'prioridade', 'status', 'recomendacao']
