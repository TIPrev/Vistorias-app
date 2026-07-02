@echo off
REM ============================================================
REM VISTORIA APP - INICIAR SERVIDOR
REM ============================================================

echo.
echo 🚀 Iniciando Assistente de Vistoria Backend...
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Erro: Python não encontrado!
    echo.
    echo Por favor instale Python 3.8+ de: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

REM Instalar dependências se necessário
echo 📦 Verificando dependências...
pip install -r requirements.txt --quiet

REM Iniciar servidor
echo ✅ Dependências instaladas!
echo.
echo 🌐 Iniciando servidor em http://localhost:5000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

python app.py

if errorlevel 1 (
    echo.
    echo ❌ Erro ao iniciar o servidor!
    pause
    exit /b 1
)
