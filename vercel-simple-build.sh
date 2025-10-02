#!/bin/bash

echo "=== SIMPLE VERCEL BUILD ==="

# Limpar builds anteriores
echo "Cleaning previous builds..."
rm -rf .next
rm -rf out

# Instalar dependências
echo "Installing dependencies..."
npm install

# Gerar Prisma Client (se necessário)
echo "Generating Prisma Client..."
npx prisma generate || echo "Prisma generate warning (continuing anyway)"

# Build do Next.js com flags simples
echo "Building Next.js..."
npm run build

# Verificar se o build foi bem-sucedido
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    echo "Next.js build directory exists"
else
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

echo "=== SIMPLE BUILD COMPLETED ==="