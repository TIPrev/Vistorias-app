#!/usr/bin/env python3
# ============================================================
# TESTE DA API DO ASSISTENTE
# ============================================================

import requests
import json
import sys

# Configuração
API_URL = "http://localhost:5000/assistente/chat"
TIMEOUT = 5

# Mensagens de teste
MENSAGENS_TESTE = [
    "Como criar uma nova vistoria?",
    "Qual é o agendamento?",
    "Quais são os campos obrigatórios?",
    "Como revisar antes de salvar?",
    "Como enviar pelo WhatsApp?",
    "Qual é o telefone do cliente?",
    "Como tirar fotos?",
    "Como preencher o endereço?",
    "Quem é o responsável?",
    "O que significa cada status?",
    "Não entendo nada",
    ""
]

def testar_server():
    """Testa se o servidor está rodando"""
    try:
        response = requests.get("http://localhost:5000/", timeout=TIMEOUT)
        print("✅ Servidor está rodando!")
        print(f"   Status: {response.status_code}")
        print(f"   Resposta: {response.json()}")
        return True
    except requests.exceptions.ConnectionError:
        print("❌ Erro: Não consegui conectar ao servidor!")
        print("   Certifique-se de que está rodando: python app.py")
        return False
    except Exception as e:
        print(f"❌ Erro ao testar servidor: {e}")
        return False

def testar_mensagem(mensagem):
    """Testa uma mensagem"""
    print(f"\n📩 Testando: '{mensagem}'")
    try:
        response = requests.post(
            API_URL,
            json={"mensagem": mensagem},
            timeout=TIMEOUT
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("sucesso"):
                print(f"✅ Resposta recebida!")
                print(f"   Título: {data.get('titulo', 'N/A')}")
                print(f"   Preview: {data.get('conteudo', 'N/A')[:80]}...")
            else:
                print(f"⚠️  Resposta com erro: {data.get('conteudo', 'N/A')}")
        else:
            print(f"❌ Erro HTTP {response.status_code}: {response.text}")
            
    except requests.exceptions.Timeout:
        print(f"❌ Erro: Timeout após {TIMEOUT}s")
    except requests.exceptions.ConnectionError:
        print(f"❌ Erro: Não consegui conectar ao servidor")
    except Exception as e:
        print(f"❌ Erro: {e}")

def main():
    print("\n" + "="*60)
    print("🧪 TESTE DA API DO ASSISTENTE DE VISTORIA")
    print("="*60)
    
    # Verificar se servidor está rodando
    if not testar_server():
        sys.exit(1)
    
    # Testar mensagens
    print(f"\n\n🔄 Testando {len(MENSAGENS_TESTE)} mensagens...\n")
    
    for mensagem in MENSAGENS_TESTE:
        testar_mensagem(mensagem)
    
    print("\n" + "="*60)
    print("✅ Testes concluídos!")
    print("="*60 + "\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹️  Testes interrompidos pelo usuário")
        sys.exit(0)
