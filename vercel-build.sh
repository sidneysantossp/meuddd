#!/bin/bash

# Script de build para Vercel
# Este script garante que o banco de dados seja inicializado corretamente

echo "Iniciando build para Vercel..."

# Gerar cliente Prisma
echo "Gerando cliente Prisma..."
npx prisma generate

# Verificar se o banco de dados existe, se não, criar e popular
echo "Verificando banco de dados..."
if [ ! -f "dev.db" ]; then
    echo "Banco de dados não encontrado. Criando e populando..."
    
    # Criar o esquema do banco de dados
    npx prisma db push
    
    # Popular o banco de dados com os dados iniciais
    npx tsx prisma/seed.ts
    
    echo "Banco de dados criado e populado com sucesso!"
else
    echo "Banco de dados encontrado. Verificando schema..."
    
    # Garantir que o schema esteja atualizado
    npx prisma db push
fi

# Build do Next.js
echo "Iniciando build do Next.js..."
npm run build

echo "Build concluído com sucesso!"