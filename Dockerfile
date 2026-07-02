FROM python:3.11-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .

# Instalar dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY app.py .
COPY assistente_service.py .

# Definir variáveis de ambiente
ENV ENVIRONMENT=production
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# Expor porta
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/').read(); exit(0)" || exit 1

# Rodar app
CMD ["python", "app.py"]
