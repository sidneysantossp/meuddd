#!/bin/bash

echo "=== Script para enviar código para o GitHub usando API Key ==="
echo ""

# Verificar se o token foi fornecido como variável de ambiente
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Por favor, forneça sua chave API/token de acesso pessoal do GitHub:"
    echo ""
    read -s -p "GitHub Token: " GITHUB_TOKEN
    echo ""
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "Erro: Nenhum token fornecido."
    exit 1
fi

echo "Configurando autenticação..."
echo ""

# Configurar a URL do remoto com autenticação
git remote set-url origin "https://$GITHUB_TOKEN@github.com/sidneysantossp/meuddd.git"

echo "URL do remoto configurada com autenticação."
echo ""
echo "Enviando código para o GitHub..."
echo ""

# Tentar enviar o código
git push -u origin master --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Sucesso! O código foi enviado para o GitHub."
    echo ""
    echo "🚀 Todas as páginas SEO das cidades do Acre foram enviadas com sucesso!"
    echo ""
    echo "Próximos passos:"
    echo "1. Verifique o repositório GitHub para confirmar o envio"
    echo "2. Vá para o Vercel e force uma nova implantação"
    echo "3. Monitore o processo de implantação"
    echo ""
    echo "📱 As novas páginas incluem:"
    echo "   - DDD 68 em Cruzeiro do Sul - AC"
    echo "   - DDD 68 em Sena Madureira - AC" 
    echo "   - DDD 68 em Tarauacá - AC"
    echo "   - DDD 68 em Feijó - AC"
    echo ""
    echo "🔍 Cada página possui aproximadamente 3000 palavras com SEO otimizado!"
else
    echo ""
    echo "❌ Falha no envio. Verifique:"
    echo "1. Se o token está correto e tem permissões"
    echo "2. Se o repositório existe e você tem acesso"
    echo "3. Se a conexão com o GitHub está funcionando"
fi