from django.test import TestCase
from django.contrib.auth.models import User
from diagnostico.models.diagnostico import DiagnosticoRealizado
from diagnostico.models.plano import PlanoDeEnsino
from diagnostico.models.competencia import Competencia
from diagnostico.services.gerar_plano_service import gerar_plano

class TestGeracaoPlano(TestCase):  # <-- Nome da classe correto
    def setUp(self):
        self.usuario = User.objects.create_user(username='gean', password='senha123')

    def test_gerar_plano_para_diagnostico(self):  # <-- Nome do método correto
        respostas = [0, 0, 1]
        diagnostico = DiagnosticoRealizado.objects.create(usuario=self.usuario, respostas=respostas)

        gerar_plano(diagnostico)

        planos_gerados = PlanoDeEnsino.objects.filter(diagnostico=diagnostico)

        self.assertTrue(planos_gerados.exists())
        self.assertEqual(planos_gerados.count(), 2)
