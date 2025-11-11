from django.urls import path
from diagnostico.views.plano_views import PlanoDeEnsinoAlunoView
from diagnostico.views.views import receber_respostas

urlpatterns = [
    path('enviar-respostas/', receber_respostas, name='enviar-respostas'),
    path('planos/', PlanoDeEnsinoAlunoView.as_view(), name='planos-de-ensino'),
]

