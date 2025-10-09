#!/bin/bash

echo "================================================"
echo "    PUSH AUTOMÁTICO PARA GITHUB - MEU DDD"
echo "================================================"
echo ""
echo "📋 RESUMO DAS ALTERAÇÕES:"
echo "   ✅ Navbar duplicada removida"
echo "   ✅ Arquivo: src/app/estado/[slug]/[citySlug]/page.tsx"
echo "   ✅ Commit: ca0b2706e2fb7beeb3e1580b8ecb82a81f6886f9"
echo "   ✅ Validado com npm run lint"
echo ""
echo "🚀 O QUE ACONTECERÁ:"
echo "   1. Seu código será enviado para GitHub"
echo "   2. Vercel implantará automaticamente"
echo "   3. O site atualizará com as alterações"
echo ""
echo "⚠️  ATENÇÃO: Você precisará fornecer credenciais do GitHub"
echo ""
echo "Pressione ENTER para começar ou CTRL+C para cancelar..."
read

echo ""
echo "🔐 ENVIANDO PARA O GITHUB..."
echo ""

# Tentar fazer push
git push origin master 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCESSO! Código enviado para o GitHub!"
    echo ""
    echo "📋 PRÓXIMOS PASSOS:"
    echo "   1. Verifique: https://github.com/sidneysantossp/meuddd"
    echo "   2. Vercel: Clique em 'Redeploy' se necessário"
    echo "   3. Teste: https://meuddd.vercel.app"
    echo ""
    echo "✅ RESULTADO ESPERADO:"
    echo "   - Apenas uma navbar nas páginas de cidades"
    echo "   - Layout consistente em todo o site"
    echo "   - Funcionalidade preservada"
else
    echo ""
    echo "❌ FALHA NO ENVIO!"
    echo ""
    echo "🔧 SOLUÇÕES:"
    echo "   1. Verifique seu usuário/senha do GitHub"
    echo "   2. Use Personal Access Token se tiver 2FA"
    echo "   3. Tente: git push https://TOKEN@github.com/sidneysantossp/meuddd.git master"
    echo ""
    echo "📞 AJUDA:"
    echo "   - Verifique o arquivo SOLUTION.md para mais detalhes"
    echo "   - Execute: npm run lint (para validar código)"
    echo "   - Verifique: tail -f dev.log (logs do servidor)"
fi

echo ""
echo "================================================"
read -p "Pressione ENTER para finalizar..."
