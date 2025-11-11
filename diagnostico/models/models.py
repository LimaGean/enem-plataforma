from django.db import models
from django.contrib.auth.models import User

# Definimos as Áreas do ENEM
AREAS = [
    ('MAT', 'Matemática'),
    ('NAT', 'Ciências da Natureza'),
    ('LING', 'Linguagens e Códigos'),
    ('HUM', 'Ciências Humanas'),
]

# Prioridades para o plano de estudo
PRIORIDADE = [
    (1, 'Alta'),
    (2, 'Média'),
    (3, 'Baixa'),
]

# Status do andamento do estudo
STATUS_PLANO = [
    ('pendente', 'Pendente'),
    ('em_andamento', 'Em andamento'),
    ('concluido', 'Concluído'),
]


# Modelo para guardar o diagnóstico realizado pelo aluno
class DiagnosticoRealizado(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='diagnosticos')
    data_realizacao = models.DateTimeField(auto_now_add=True)
    respostas = models.JSONField(help_text="Respostas do aluno em formato JSON")

    class Meta:
        verbose_name = "Diagnóstico Realizado"
        verbose_name_plural = "Diagnósticos Realizados"
        ordering = ['-data_realizacao']

    def __str__(self):
        return f"Diagnóstico de {self.usuario.username} em {self.data_realizacao.strftime('%d/%m/%Y')}"


# Modelo para guardar cada Competência (habilidade do ENEM)
class Competencia(models.Model):
    codigo = models.CharField(max_length=20, unique=True, help_text="Ex: MAT01, NAT04")
    descricao = models.TextField()
    area = models.CharField(max_length=5, choices=AREAS)

    class Meta:
        verbose_name = "Competência"
        verbose_name_plural = "Competências"
        ordering = ['area', 'codigo']

    def __str__(self):
        return f"{self.codigo} - {self.get_area_display()}"


# Modelo para guardar o Plano de Ensino gerado para o aluno
class PlanoDeEnsino(models.Model):
    diagnostico = models.ForeignKey(
        DiagnosticoRealizado,
        on_delete=models.CASCADE,
        related_name='planos'
    )
    competencia = models.ForeignKey(Competencia, on_delete=models.CASCADE)
    prioridade = models.IntegerField(choices=PRIORIDADE)
    status = models.CharField(max_length=20, choices=STATUS_PLANO, default='pendente')
    recomendacao = models.TextField(blank=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Plano de Ensino"
        verbose_name_plural = "Planos de Ensino"
        ordering = ['prioridade', '-data_criacao']

    def __str__(self):
        return f"Plano para {self.competencia.codigo} [{self.get_prioridade_display()}]"
