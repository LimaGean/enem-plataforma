from rest_framework import serializers

class RespostaDiagnosticoSerializer(serializers.Serializer):
    respostas = serializers.ListField(
        child=serializers.IntegerField(), allow_empty=False
    )
