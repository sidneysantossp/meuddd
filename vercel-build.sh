#!/bin/bash

# SCRIPT FINAL - FORÇAR LIMPEZA TOTAL E ATUALIZAÇÃO
echo "=== SCRIPT FINAL - FORÇAR ATUALIZAÇÃO COMPLETA ==="

# Timestamp para forçar atualização
TIMESTAMP=$(date +%s)
echo "Timestamp: $TIMESTAMP"

# Limpeza AGRESSIVA de todos os caches
echo "Step 1: Limpando TODOS os caches e builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache
rm -rf .cache
rm -rf *.log
rm -rf *.tmp
rm -rf .turbo
rm -rf .vercel

# Limpar cache npm
echo "Step 2: Limpando cache npm..."
npm cache clean --force

# Reinstalar dependências
echo "Step 3: Reinstalando dependências..."
npm install

# Gerar Prisma Client
echo "Step 4: Gerando Prisma Client..."
npx prisma generate

# Build do Next.js
echo "Step 5: Build do Next.js..."
npm run build

# Verificação CRÍTICA do routes-manifest.json
echo "Step 6: Verificando routes-manifest.json..."
if [ -f ".next/routes-manifest.json" ]; then
    echo "✅ routes-manifest.json criado com sucesso!"
    echo "📁 Tamanho: $(wc -c < .next/routes-manifest.json) bytes"
    echo "📋 Primeiras linhas do arquivo:"
    head -10 .next/routes-manifest.json
else
    echo "❌ ERRO CRÍTICO: routes-manifest.json NÃO foi criado!"
    echo "📋 Conteúdo do diretório .next:"
    ls -la .next/ || echo "Diretório .next não existe"
    exit 1
fi

# Verificar outros arquivos essenciais
echo "Step 7: Verificando arquivos essenciais..."
essential_files=(".next/BUILD_ID" ".next/server/pages-manifest.json" ".next/app-path-routes-manifest.json")
for file in "${essential_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file existe"
    else
        echo "❌ ERRO: $file está faltando!"
        exit 1
    fi
done

echo "=== BUILD FINAL CONCLUÍDO COM SUCESSO ==="
echo "Timestamp: $TIMESTAMP"
echo "PRONTO PARA DEPLOY NO VERCEL!"