#!/bin/bash

# EMERGENCY BUILD SCRIPT - Complete cache cleanup
echo "=== EMERGENCY BUILD - COMPLETE CACHE CLEANUP ==="

# Limpar TODOS os caches e builds anteriores
echo "Step 1: Removing ALL caches and builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache
rm -rf .cache
rm -rf *.log
rm -rf *.tmp

# Limpar cache do npm
echo "Step 2: Clearing npm cache..."
npm cache clean --force

# Reinstalar dependências
echo "Step 3: Reinstalling dependencies..."
npm install

# Gerar Prisma Client
echo "Step 4: Generating Prisma Client..."
npx prisma generate

# Build do Next.js com flags para evitar cache
echo "Step 5: Building Next.js with no cache..."
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Verificar se o routes-manifest.json foi criado
echo "Step 6: Verifying routes-manifest.json..."
if [ -f ".next/routes-manifest.json" ]; then
    echo "✅ routes-manifest.json created successfully!"
    echo "File size: $(wc -c < .next/routes-manifest.json) bytes"
else
    echo "❌ ERROR: routes-manifest.json NOT created!"
    exit 1
fi

# Verificar outros arquivos críticos
echo "Step 7: Verifying other critical files..."
critical_files=(".next/BUILD_ID" ".next/server/pages-manifest.json" ".next/app-path-routes-manifest.json")
for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ ERROR: $file missing!"
        exit 1
    fi
done

echo "=== EMERGENCY BUILD COMPLETED SUCCESSFULLY ==="
echo "Ready for Vercel deployment!"