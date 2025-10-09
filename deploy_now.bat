@echo off
chcp 65001 > nul
echo =================================================================
echo     DEPLOY COMPLETO - MEU DDD PARA GITHUB
echo =================================================================
echo.
echo 📊 STATUS ATUAL:
echo    ✅ Código pronto e validado
echo    ✅ Dois commits criados localmente
echo    ✅ Todos os arquivos preparados
echo    ❌ Aguardando envio para GitHub
echo.
echo 📋 COMMITS PARA ENVIAR:
echo    1. ca0b270 - Remove duplicate navbar from city pages
echo    2. e92d738 - Add deployment helper scripts and tools
echo.
echo 🚀 MÉTODOS DISPONÍVEIS:
echo.
echo    Método 1: Git Push Direto
echo    git push origin master
echo.
echo    Método 2: Com Token
echo    git push https://TOKEN@github.com/sidneysantossp/meuddd.git master
echo.
echo    Método 3: Script Automático
echo    ./easy_push.sh
echo.
echo    Método 4: Script Alternativo
echo    ./push_to_github.sh
echo.
echo ⚠️  ATENÇÃO: Escolha UM método acima e execute-o
echo.
echo 📝 O QUE ACONTECERÁ DEPOIS DO ENVIO:
echo    1. GitHub receberá os commits
echo    2. Vercel detectará as alterações
echo    3. Site será atualizado automaticamente
echo    4. Navbar duplicada será removida
echo.
echo =================================================================
echo.
echo Execute um dos comandos acima para finalizar o deploy!
echo.
echo Comandos disponíveis:
echo   1) git push origin master
echo   2) ./easy_push.sh
echo   3) ./push_to_github.sh
echo   4) ./push_now.sh
echo.
set /p option="Digite o número da opção desejada ou 0 para sair: "

if "%option%"=="1" (
    echo Executando: git push origin master
    git push origin master
) else if "%option%"=="2" (
    echo Executando: ./easy_push.sh
    ./easy_push.sh
) else if "%option%"=="3" (
    echo Executando: ./push_to_github.sh
    ./push_to_github.sh
) else if "%option%"=="4" (
    echo Executando: ./push_now.sh
    ./push_now.sh
) else if "%option%"=="0" (
    echo Saindo...
    exit /b 0
) else (
    echo Opção inválida!
    exit /b 1
)

if %errorlevel% equ 0 (
    echo.
    echo 🎉 SUCESSO! Código enviado para o GitHub!
    echo.
    echo 📋 PRÓXIMOS PASSOS:
    echo    1. Verifique: https://github.com/sidneysantossp/meuddd
    echo    2. Vercel: Aguarde implantação ou clique em "Redeploy"
    echo    3. Teste: https://meuddd.vercel.app
    echo.
    echo ✅ RESULTADO ESPERADO:
    echo    - Apenas uma navbar nas páginas de cidades
    echo    - Layout consistente em todo o site
    echo    - Funcionalidade preservada
) else (
    echo.
    echo ❌ FALHA NO ENVIO!
    echo    Verifique suas credenciais do GitHub e tente novamente
)

echo.
echo =================================================================
pause
