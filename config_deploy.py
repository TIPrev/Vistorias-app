#!/usr/bin/env python3
# ============================================================
# CONFIGURAÇÃO DE AMBIENTE - DESENVOLVIMENTO & PRODUÇÃO
# ============================================================

import os

class Config:
    """Configuração base"""
    DEBUG = False
    TESTING = False
    
    # Porta (Railway detecta automaticamente)
    PORT = int(os.getenv("PORT", 5000))
    
    # Backend URL para frontend
    BACKEND_URL = os.getenv("BACKEND_URL", f"http://localhost:{PORT}")
    
    # CORS
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

class DevelopmentConfig(Config):
    """Configuração para desenvolvimento"""
    DEBUG = True
    BACKEND_URL = "http://localhost:5000"

class ProductionConfig(Config):
    """Configuração para produção"""
    DEBUG = False
    # Railway fornece URL automática em RAILWAY_STATIC_URL
    BACKEND_URL = os.getenv("BACKEND_URL", os.getenv("RAILWAY_PUBLIC_DOMAIN", ""))
    if BACKEND_URL and not BACKEND_URL.startswith("http"):
        BACKEND_URL = f"https://{BACKEND_URL}"

# Detectar ambiente
ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()

if ENVIRONMENT == "production":
    config = ProductionConfig()
else:
    config = DevelopmentConfig()
