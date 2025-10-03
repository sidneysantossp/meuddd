#!/bin/bash

# Script para enviar todas as atualizações para o GitHub
# Este script commita e pusha todas as novas páginas SEO das cidades do Acre

echo "Iniciando processo de envio para o GitHub..."

# Adicionar todas as alterações ao staging area
git add .

# Verificar o status
echo "Verificando status das alterações..."
git status

# Criar commit com mensagem descritiva
echo "Criando commit..."
git commit -m "$(cat <<'EOF'
feat: Adiciona páginas SEO otimizadas para as principais cidades do Acre

- Criada página SEO completa para Cruzeiro do Sul - AC (3000 palavras)
- Criada página SEO completa para Sena Madureira - AC (3000 palavras) 
- Criada página SEO completa para Tarauacá - AC (3000 palavras)
- Criada página SEO completa para Feijó - AC (3000 palavras)

Cada página inclui:
- Metadata otimizada para SEO com title, description e keywords
- Conteúdo extenso com 10 seções H2 abordando diversos aspectos
- Dados estruturados JSON-LD para melhor indexação
- Links internos estratégicos para SEO
- Conteúdo otimizado para busca por voz e long tails
- Informações detalhadas sobre DDD 68, operadoras e funcionamento
- História, geografia e importância econômica de cada cidade
- Dicas práticas para residentes e visitantes
- Call-to-action e recursos adicionais

As páginas seguem as melhores práticas de SEO onpage e offpage,
com aproximadamente 3000 palavras cada, garantindo cobertura
completa e autoridade no tema de códigos DDD do Acre.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"

# Fazer push para o repositório remoto
echo "Enviando alterações para o GitHub..."
git push origin master

# Verificar se o push foi bem sucedido
if [ $? -eq 0 ]; then
    echo "✅ Sucesso! Todas as alterações foram enviadas para o GitHub."
    echo "🚀 As novas páginas SEO das cidades do Acre estão agora disponíveis no repositório."
    echo "📱 Você pode fazer o redeploy da aplicação para publicar as novas páginas."
else
    echo "❌ Erro ao enviar para o GitHub. Verifique suas credenciais e tente novamente."
    exit 1
fi

echo "Processo concluído com sucesso!"