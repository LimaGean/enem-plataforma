#!/usr/bin/env bash
# exit on error
set -o errexit

# Instalar dependencias Python
pip install -r requirements.txt

# Coletar arquivos estaticos do Django
python manage.py collectstatic --no-input

# Executar migracoes
python manage.py migrate

echo "Build concluido com sucesso!"
