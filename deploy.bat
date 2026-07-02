@echo off
REM ============================================================
REM DEPLOY AUTOMÁTICO - VISTORIA APP
REM ============================================================

echo.
echo 🚀 VISTORIA APP - DEPLOY AUTOMÁTICO
echo.
echo Escolha uma opção:
echo   1 = Deploy Tudo (Frontend + Backend)
echo   2 = Deploy Frontend (Firebase)
echo   3 = Deploy Backend (Railway/GitHub)
echo   0 = Cancelar
echo.

set /p opcao="Digite sua opção (0-3): "

if "%opcao%"=="0" (
    echo.
    echo ❌ Cancelado
    echo.
    pause
    exit /b 0
)

if "%opcao%"=="1" (
    python deploy.py all
    pause
    exit /b %errorlevel%
)

if "%opcao%"=="2" (
    python deploy.py frontend
    pause
    exit /b %errorlevel%
)

if "%opcao%"=="3" (
    python deploy.py backend
    pause
    exit /b %errorlevel%
)

echo.
echo ❌ Opção inválida!
echo.
pause
exit /b 1
