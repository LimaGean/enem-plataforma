from diagnostico.models import Competencia, PlanoDeEnsino

def gerar_plano(diagnostico):
    respostas_aluno = diagnostico.respostas

    GABARITO = [1, 1, 0]
    COMPETENCIAS = [
        ('MAT01', 'Resolver problemas envolvendo operações básicas.'),
        ('HUM03', 'Interpretar textos históricos e sociais.'),
        ('LING02', 'Compreender gêneros literários.'),
    ]

    for i, resposta in enumerate(respostas_aluno):
        if i >= len(GABARITO):
            break

        correta = GABARITO[i]
        competencia_codigo, descricao = COMPETENCIAS[i]

        competencia_obj, created = Competencia.objects.get_or_create(
            codigo=competencia_codigo,
            defaults={'descricao': descricao, 'area': competencia_codigo[:3]},
        )

        if resposta != correta:
            PlanoDeEnsino.objects.create(
                diagnostico=diagnostico,
                competencia=competencia_obj,
                prioridade=1,
                recomendacao=f"Revisar conteúdo sobre: {descricao}"
            )
