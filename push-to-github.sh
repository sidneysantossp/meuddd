#!/bin/bash

# Script para enviar projeto DDDs do Brasil para GitHub
# Execute este script no seu terminal local

echo "🚀 Enviando projeto DDDs do Brasil para GitHub..."

# Verificar se estamos no branch main
git branch

# Adicionar todos os arquivos
git add .

# Fazer commit com mensagem descritiva
git commit -m "feat: Adiciona site completo DDDs do Brasil com otimização SEO

- Implementada consulta completa de DDDs brasileiros
- Otimização SEO completa para 'DDDs do Brasil'
- Metadados otimizados com título e descrição
- Dados estruturados (Schema.org) para melhor visibilidade
- Open Graph e Twitter Cards para redes sociais
- Interface responsiva com shadcn/ui
- Design moderno e acessível
- Organização por estados com busca instantânea
- Informações detalhadas de cada DDD

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# Enviar para GitHub
git push origin main

echo "✅ Projeto enviado com sucesso para GitHub!"
echo "🌐 Acesse: https://github.com/sidneysantossp/meuddd"