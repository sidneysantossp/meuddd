#!/bin/bash

echo "=== Enviando alterações para o GitHub ==="
echo ""
echo "Repositório: https://github.com/sidneysantossp/meuddd.git"
echo "Alteração: Remoção de navbar duplicada"
echo ""
echo "Pressione ENTER para continuar ou CTRL+C para cancelar..."
read

echo ""
echo "Enviando..."
echo ""

git push -u origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCESSO! Alterações enviadas para o GitHub."
    echo ""
    echo "Próximos passos:"
    echo "1. Verifique o repositório GitHub"
    echo "2. Vá para o Vercel e clique em 'Redeploy'"
    echo "3. Aguarde a implantação e teste o site"
else
    echo ""
    echo "❌ FALHA ao enviar. Verifique:"
    echo "1. Suas credenciais do GitHub"
    echo "2. Sua conexão com a internet"
    echo "3. Seu acesso ao repositório"
fi

echo ""
read -p "Pressione ENTER para finalizar..."
