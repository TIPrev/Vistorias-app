#!/usr/bin/env python3
# ============================================================
# VISTORIA APP - SERVIDOR BACKEND FLASK
# ============================================================

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from assistente_service import AssistenteService

# Carregar variáveis de ambiente
load_dotenv()

# Inicializar Flask
app = Flask(__name__)

# Configurar CORS
CORS(app, resources={
    r"/assistente/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Inicializar serviço de assistente
assistente = AssistenteService()

# ============================================================
# ROTAS
# ============================================================

@app.route("/", methods=["GET"])
def index():
    """Rota raiz - verifica se servidor está rodando"""
    return jsonify({
        "status": "ok",
        "message": "Servidor Vistoria App está rodando",
        "endpoints": {
            "chat": "/assistente/chat (POST)"
        }
    }), 200


@app.route("/assistente/chat", methods=["POST"])
def assistente_chat():
    """
    Rota para chat com o assistente de vistoria
    
    Request:
    {
        "mensagem": "Digite sua dúvida"
    }
    
    Response:
    {
        "sucesso": true,
        "titulo": "📝 Nova Vistoria",
        "conteudo": "<p>Conteúdo HTML da resposta</p>",
        "erro": null
    }
    """
    try:
        # Validar request
        data = request.get_json()
        if not data:
            return jsonify({
                "sucesso": False,
                "titulo": "Erro",
                "conteudo": "Nenhum dados recebidos",
                "erro": "JSON vazio"
            }), 400

        mensagem = data.get("mensagem", "").strip()
        if not mensagem:
            return jsonify({
                "sucesso": False,
                "titulo": "Erro",
                "conteudo": "Mensagem vazia",
                "erro": "Campo 'mensagem' obrigatório"
            }), 400

        # Processar mensagem
        resposta = assistente.processar_mensagem(mensagem)

        return jsonify({
            "sucesso": True,
            "titulo": resposta.get("titulo", ""),
            "conteudo": resposta.get("conteudo", ""),
            "erro": None
        }), 200

    except Exception as e:
        print(f"[Assistente] Erro na rota /assistente/chat: {e}")
        return jsonify({
            "sucesso": False,
            "titulo": "Erro no servidor",
            "conteudo": "Não consegui processar sua pergunta. Tente novamente.",
            "erro": str(e)
        }), 500


@app.errorhandler(404)
def not_found(error):
    """Erro 404"""
    return jsonify({
        "status": "erro",
        "message": "Rota não encontrada",
        "error": 404
    }), 404


@app.errorhandler(500)
def server_error(error):
    """Erro 500"""
    return jsonify({
        "status": "erro",
        "message": "Erro no servidor",
        "error": 500
    }), 500


# ============================================================
# INICIALIZAR SERVIDOR
# ============================================================

if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    
    print(f"\n🚀 Iniciando Vistoria App Backend")
    print(f"   Ambiente: {ENVIRONMENT.upper()}")
    print(f"   Porta: {PORT}")
    print(f"   Debug: {DEBUG}")
    
    if ENVIRONMENT == "production":
        railway_domain = os.getenv("RAILWAY_PUBLIC_DOMAIN", "")
        if railway_domain:
            print(f"   URL: https://{railway_domain}")
            print(f"   Chat API: https://{railway_domain}/assistente/chat")
        else:
            print(f"   URL: http://localhost:{PORT}")
    else:
        print(f"   URL: http://localhost:{PORT}")
        print(f"   Assistente Chat: POST http://localhost:{PORT}/assistente/chat")
    
    app.run(
        host="0.0.0.0",
        port=PORT,
        debug=DEBUG
    )
