# Guia de Deploy - Plataforma ENEM no Render

Este guia apresenta instruções passo a passo para fazer deploy da Plataforma ENEM no Render.

## Pré-requisitos

- Conta no GitHub (gratuita)
- Conta no Render (gratuita)
- Projeto versionado com Git

## Passo 1: Preparar o Repositório Git

### 1.1 Inicializar Git (se ainda não foi feito)

```bash
cd C:\Users\ge-ap\OneDrive\Documentos\Django\enem
git init
```

### 1.2 Criar arquivo .env para variáveis locais

Copie o arquivo `.env.example` para `.env` e configure suas variáveis locais:

```bash
SECRET_KEY=sua-chave-secreta-local
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

**IMPORTANTE**: O arquivo `.env` já está no `.gitignore` e NÃO será enviado ao GitHub.

### 1.3 Fazer commit dos arquivos

```bash
git add .
git commit -m "Configuração inicial para deploy no Render"
```

### 1.4 Criar repositório no GitHub

1. Acesse https://github.com e faça login
2. Clique em "New repository"
3. Nome do repositório: `enem-plataforma` (ou outro de sua escolha)
4. Deixe como público ou privado (ambos funcionam com Render)
5. NÃO inicialize com README, .gitignore ou license (já temos esses arquivos)
6. Clique em "Create repository"

### 1.5 Conectar repositório local ao GitHub

Copie os comandos que o GitHub fornece na página do repositório criado. Exemplo:

```bash
git remote add origin https://github.com/seu-usuario/enem-plataforma.git
git branch -M main
git push -u origin main
```

## Passo 2: Configurar Deploy no Render

### 2.1 Criar conta no Render

1. Acesse https://render.com
2. Clique em "Get Started for Free"
3. Faça signup usando sua conta do GitHub (recomendado)
4. Autorize o Render a acessar seus repositórios

### 2.2 Criar novo Web Service

1. No dashboard do Render, clique em "New +"
2. Selecione "Web Service"
3. Conecte seu repositório GitHub `enem-plataforma`
4. Configure o serviço:

**Nome**: `enem-plataforma` (ou outro de sua escolha)

**Region**: Escolha a região mais próxima (ex: Ohio, US East)

**Branch**: `main`

**Runtime**: `Python 3`

**Build Command**:
```bash
./build.sh
```

**Start Command**:
```bash
gunicorn enem_plataforma.wsgi:application
```

**Plan**: `Free`

### 2.3 Configurar Variáveis de Ambiente

Na seção "Environment Variables", adicione:

1. **SECRET_KEY**: Clique em "Generate" para criar uma chave aleatória segura

2. **DEBUG**: `False`

3. **ALLOWED_HOSTS**: `enem-plataforma.onrender.com`
   (substitua pelo nome real do seu serviço)

4. **PYTHON_VERSION**: `3.11.0`

**IMPORTANTE**: NÃO use as mesmas chaves do arquivo `.env` local em produção!

### 2.4 Iniciar Deploy

1. Clique em "Create Web Service"
2. O Render iniciará automaticamente o build e deploy
3. Acompanhe os logs na tela
4. O processo pode levar 5-10 minutos na primeira vez

## Passo 3: Verificar Deploy

### 3.1 Acessar o Site

Quando o deploy terminar:
1. O status mudará para "Live" (verde)
2. Você verá a URL do seu site: `https://enem-plataforma.onrender.com`
3. Clique na URL para acessar

### 3.2 Acessar o Admin do Django

1. Acesse `https://seu-site.onrender.com/admin`
2. Você precisará criar um superusuário primeiro

### 3.3 Criar Superusuário

No dashboard do Render:
1. Vá até seu Web Service
2. Clique na aba "Shell"
3. Execute:

```bash
python manage.py createsuperuser
```

Siga as instruções para criar usuário e senha.

## Passo 4: Configurar Banco de Dados PostgreSQL (Opcional mas Recomendado)

O projeto está configurado para SQLite, que funciona mas não é ideal para produção.

### 4.1 Criar Database no Render

1. No dashboard, clique em "New +"
2. Selecione "PostgreSQL"
3. Configure:
   - **Name**: `enem-db`
   - **Database**: `enem_database`
   - **User**: `enem_user`
   - **Region**: mesma do Web Service
   - **Plan**: `Free`
4. Clique em "Create Database"

### 4.2 Conectar ao Web Service

1. Volte ao seu Web Service
2. Vá em "Environment"
3. Adicione variável:
   - **Key**: `DATABASE_URL`
   - **Value**: Copie a "Internal Database URL" do PostgreSQL criado

### 4.3 Atualizar settings.py

Adicione ao `settings.py`:

```python
import dj_database_url

# ...

DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600
    )
}
```

### 4.4 Atualizar requirements.txt

Adicione:
```
dj-database-url>=2.1.0,<3.0.0
psycopg2-binary>=2.9.9,<3.0.0
```

### 4.5 Fazer commit e push

```bash
git add .
git commit -m "Adiciona suporte a PostgreSQL"
git push
```

O Render fará redeploy automaticamente.

## Passo 5: Domínio Personalizado (Opcional)

Se você tem um domínio próprio:

1. No Web Service, vá em "Settings"
2. Role até "Custom Domain"
3. Clique em "Add Custom Domain"
4. Siga as instruções para configurar DNS

## Solução de Problemas

### Build falhou

1. Verifique os logs de build no Render
2. Verifique se `build.sh` tem permissão de execução:
   ```bash
   chmod +x build.sh
   git add build.sh
   git commit -m "Adiciona permissão de execução ao build.sh"
   git push
   ```

### Site mostra erro 500

1. Verifique os logs em "Logs" no dashboard
2. Confirme que `DEBUG=False` em produção
3. Verifique se `ALLOWED_HOSTS` está correto

### Arquivos estáticos não carregam

1. Verifique se WhiteNoise está instalado em `requirements.txt`
2. Execute manualmente:
   ```bash
   python manage.py collectstatic --no-input
   ```
3. Verifique configuração do WhiteNoise em `settings.py`

### Frontend não carrega

1. Verifique se o build do React foi executado em `build.sh`
2. Confirme que arquivos foram copiados para `staticfiles/frontend/`
3. Verifique configuração de `TEMPLATES` em `settings.py`

## Manutenção

### Fazer updates

1. Faça alterações localmente
2. Teste localmente com `python manage.py runserver`
3. Commit e push:
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   git push
   ```
4. Render fará redeploy automaticamente

### Executar comandos no servidor

Use a aba "Shell" no dashboard do Render:

```bash
# Executar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Coletar arquivos estáticos
python manage.py collectstatic --no-input
```

### Monitoramento

- **Logs**: Aba "Logs" mostra logs em tempo real
- **Metrics**: Aba "Metrics" mostra uso de CPU e memória
- **Events**: Aba "Events" mostra histórico de deploys

## Limitações do Plano Free

- **Sleep após inatividade**: Serviço "dorme" após 15 minutos sem requisições
- **750 horas/mês**: Limite de horas ativas
- **100GB bandwidth/mês**: Limite de transferência
- **Builds lentos**: Prioridade menor na fila de build

Para remover limitações, considere upgrade para plano pago ($7/mês).

## Links Úteis

- **Dashboard Render**: https://dashboard.render.com
- **Documentação Render**: https://render.com/docs
- **Documentação Django**: https://docs.djangoproject.com
- **Seu site**: https://enem-plataforma.onrender.com (substitua pela URL real)

## Suporte

Em caso de dúvidas:
- Documentação Render: https://render.com/docs
- Comunidade Render: https://community.render.com
- Django Forum: https://forum.djangoproject.com
