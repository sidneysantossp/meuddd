#!/bin/bash

echo "=== Script para enviar código para o GitHub ==="
echo ""
echo "Este script irá executar o comando git push para enviar o código atualizado"
echo "para o repositório GitHub: sidneysantossp/meuddd"
echo ""
echo "Você será solicitado a fornecer suas credenciais do GitHub."
echo "Se você tiver autenticação de dois fatores, use um token de acesso pessoal."
echo ""
echo "Pressione ENTER para continuar ou CTRL+C para cancelar..."
read

echo ""
echo "Executando: git push -u origin master --force"
echo ""

# Executar o comando push
git push -u origin master --force

echo ""
echo "=== Operação concluída ==="
echo "Verifique o resultado acima para confirmar se o envio foi bem-sucedido."