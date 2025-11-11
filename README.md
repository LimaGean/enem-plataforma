# Plataforma ENEM - Diagnóstico e Plano de Ensino

Plataforma web para diagnóstico de desempenho e geração de planos de ensino personalizados para preparação ao ENEM.

## Stack Tecnológica

### Backend
- Django 5.2
- Django REST Framework
- Python 3.x
- SQLite (desenvolvimento) / PostgreSQL (produção recomendado)

### Frontend
- React 19
- TailwindCSS 4
- Axios
- React Router DOM

## Configuração do Ambiente

### Pré-requisitos
- Python 3.8+
- Node.js 18+
- pip
- npm ou yarn

### Backend - Configuração

1. **Clone o repositório e navegue até a pasta do projeto:**
```bash
cd C:\Users\ge-ap\OneDrive\Documentos\Django\enem
```

2. **Crie e ative o ambiente virtual:**
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Linux/Mac
```

3. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

4. **Configure as variáveis de ambiente:**

Copie o arquivo `.env.example` para `.env` e configure as variáveis:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

Para gerar uma nova SECRET_KEY:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

5. **Execute as migrações:**
```bash
python manage.py makemigrations
python manage.py migrate
```

6. **Crie um superusuário:**
```bash
python manage.py createsuperuser
```

7. **Inicie o servidor de desenvolvimento:**
```bash
python manage.py runserver
```

O backend estará disponível em: `http://localhost:8000`
Admin em: `http://localhost:8000/admin`

### Frontend - Configuração

1. **Navegue até a pasta do frontend:**
```bash
cd frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Edite o arquivo `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_ENV=development
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173` (ou porta indicada)

## Estrutura do Projeto

```
enem/
├── enem_plataforma/          # Configurações do projeto Django
│   ├── settings.py           # Settings de desenvolvimento
│   ├── production.py         # Settings de produção
│   ├── urls.py              # URLs principais
│   └── wsgi.py              # Configuração WSGI
├── diagnostico/             # App principal
│   ├── models/              # Modelos de dados
│   ├── views/               # Views da API
│   ├── services/            # Lógica de negócio
│   ├── serializers.py       # Serializers DRF
│   ├── admin.py             # Configuração do admin
│   └── urls.py              # URLs do app
├── frontend/                # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas
│   │   ├── services/        # Serviços (API)
│   │   ├── context/         # Context API
│   │   └── routes/          # Configuração de rotas
│   └── public/              # Arquivos públicos
├── .env.example             # Exemplo de variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── requirements.txt         # Dependências Python
└── README.md               # Este arquivo
```

## API Endpoints

### Diagnóstico
- `POST /api/diagnostico/enviar-respostas/` - Enviar respostas do diagnóstico
  - Requer autenticação
  - Body: `{"respostas": [0, 1, 0, ...]}`

### Planos de Ensino
- `GET /api/diagnostico/planos/` - Listar planos do usuário autenticado
  - Requer autenticação
  - Retorna lista paginada de planos

### Admin
- `GET /admin/` - Interface administrativa Django

## Funcionalidades

- ✅ Sistema de autenticação de usuários
- ✅ Diagnóstico com questões de múltipla escolha
- ✅ Avaliação automática com base em gabarito
- ✅ Geração de plano de ensino personalizado
- ✅ Dashboard com planos de ensino priorizados
- ✅ Interface administrativa para gestão

## Próximos Passos

### Para Desenvolvimento
1. Configurar autenticação JWT (opcional)
2. Adicionar mais questões ao banco de dados
3. Implementar filtros e busca nos planos
4. Adicionar testes automatizados

### Para Produção
1. Configure as variáveis de ambiente de produção
2. Use PostgreSQL ao invés de SQLite
3. Configure o arquivo de settings de produção:
   ```bash
   export DJANGO_SETTINGS_MODULE=enem_plataforma.production
   ```
4. Execute a coleta de arquivos estáticos:
   ```bash
   python manage.py collectstatic
   ```
5. Configure um servidor web (Nginx + Gunicorn)
6. Configure HTTPS/SSL
7. Configure backup do banco de dados

## Variáveis de Ambiente

### Backend (.env)
- `SECRET_KEY` - Chave secreta Django (obrigatório)
- `DEBUG` - Modo debug (True/False)
- `ALLOWED_HOSTS` - Hosts permitidos (separados por vírgula)
- `DATABASE_URL` - URL do banco de dados (opcional)
- `CORS_ALLOWED_ORIGINS` - Origens permitidas CORS (produção)

### Frontend (.env)
- `VITE_API_BASE_URL` - URL base da API
- `VITE_APP_ENV` - Ambiente (development/production)

## Segurança

- ✅ Secret key gerenciada por variável de ambiente
- ✅ CORS configurado para desenvolvimento
- ✅ Autenticação obrigatória em endpoints sensíveis
- ✅ Rate limiting configurado (100/hora anônimo, 1000/hora autenticado)
- ✅ Settings de produção com configurações de segurança

## Troubleshooting

### Problema: Erro ao instalar dependências
**Solução:** Certifique-se de que o ambiente virtual está ativado e atualize o pip:
```bash
python -m pip install --upgrade pip
```

### Problema: CORS error no frontend
**Solução:** Verifique se o django-cors-headers está instalado e configurado corretamente no settings.py

### Problema: 401 Unauthorized
**Solução:** Certifique-se de que está autenticado. O token deve estar no localStorage do navegador.

## Contribuição

Para contribuir com o projeto:
1. Crie uma branch para sua feature
2. Faça commit das mudanças
3. Abra um Pull Request

## Licença

Este projeto é de uso educacional.
