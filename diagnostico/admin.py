from django.contrib import admin
from .models import DiagnosticoRealizado

# Gabarito simulado para calcular acertos
GABARITO_SIMULADO = [1, 1, 0]  # Exemplo: respostas corretas para as 3 perguntas de teste

@admin.register(DiagnosticoRealizado)
class DiagnosticoRealizadoAdmin(admin.ModelAdmin):
    list_display = (
        'usuario',
        'data_realizacao',
        'total_respostas',
        'total_acertos',
        'percentual_acerto',
        'respostas_curto'
    )
    list_filter = ('data_realizacao',)
    search_fields = ('usuario__username', 'usuario__email')
    ordering = ('-data_realizacao',)
    date_hierarchy = 'data_realizacao'

    def total_respostas(self, obj):
        """Conta quantas respostas o aluno enviou."""
        return len(obj.respostas) if obj.respostas else 0
    total_respostas.short_description = 'Qtd. Respostas'

    def total_acertos(self, obj):
        """Conta quantas respostas foram corretas, comparando com o gabarito simulado."""
        if not obj.respostas:
            return 0
        return sum(1 for i, resp in enumerate(obj.respostas) if i < len(GABARITO_SIMULADO) and resp == GABARITO_SIMULADO[i])
    total_acertos.short_description = 'Qtd. Acertos'

    def percentual_acerto(self, obj):
        """Calcula o percentual de acertos."""
        if not obj.respostas or len(obj.respostas) == 0:
            return "0%"
        acertos = self.total_acertos(obj)
        percentual = (acertos / len(obj.respostas)) * 100
        return f"{percentual:.1f}%"
    percentual_acerto.short_description = 'Percentual de Acerto'

    def respostas_curto(self, obj):
        """Exibe um resumo das respostas."""
        if obj.respostas:
            return str(obj.respostas)[:40] + "..."
        return "-"
    respostas_curto.short_description = 'Respostas (resumo)'


