#!/bin/bash

echo "=== FORÇAR DEPLOY COM VERSÃO FINAL ==="
echo "Commit atual: $(git rev-parse HEAD)"
echo "Commit mais recente: $(git log --oneline -1)"

# Tentar push com force
echo "Tentando push forçado..."
git push -f origin master 2>&1

echo "=== RESULTADO ==="
echo "Se o push falhou, você precisa:"
echo "1. Configurar credenciais do GitHub"
echo "2. Ou fazer push manualmente: git push origin master"
echo "3. Ou usar o GitHub interface para forçar deploy"