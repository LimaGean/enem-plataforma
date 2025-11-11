#!/usr/bin/env bash
# exit on error
set -o errexit

# Instalar dependencias Python
pip install -r requirements.txt

# Coletar arquivos estaticos do Django
python manage.py collectstatic --no-input

# Executar migracoes
python manage.py migrate

# Build do frontend React
cd frontend
npm install
npm run build
cd ..

# Copiar build do React para pasta static do Django
mkdir -p staticfiles/frontend
cp -r frontend/dist/* staticfiles/frontend/

echo "Build concluido com sucesso!"
