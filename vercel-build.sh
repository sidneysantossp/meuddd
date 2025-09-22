#!/bin/bash

echo "🚀 Iniciando build para Vercel..."

# Gerar cliente Prisma
echo "📦 Gerando cliente Prisma..."
npm run db:generate

# Verificar se o banco de dados existe
if [ ! -f "prisma/dev.db" ]; then
  echo "📊 Banco de dados não encontrado, criando..."
  npm run db:push
  npm run db:seed
else
  echo "📊 Banco de dados já existe"
fi

# Build do Next.js
echo "🔨 Build do Next.js..."
npm run build

echo "✅ Build concluído com sucesso!"