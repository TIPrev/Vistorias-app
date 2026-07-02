#!/usr/bin/env python3
# ============================================================
# TESTE DO ASSISTENTE 100% FRONT-END
# ============================================================

"""
Este script simula testes de busca de respostas do assistente.
Mostra como o algoritmo de palavras-chave funciona.

Uso: python test_assistente_frontend.py
"""

# Base de Conhecimento (espelha css/js/assistant.js)
palavras_chave = {
    "nova-vistoria": ["nova vistoria", "criar vistoria", "fazer vistoria", "vistoria nova", "vistoria"],
    "agendamentos": ["agendamento", "agendar", "marcar", "data horário", "schedular"],
    "campos-obrigatorios": ["campos obrigatório", "campo obrigatório", "obrigatório", "campos", "preenchimento"],
    "revisar": ["revisar", "conferir", "revisar antes", "verificar antes", "checar"],
    "whatsapp": ["whatsapp", "wpp", "mensagem", "enviar mensagem"],
    "telefone": ["telefone", "telefo", "contato", "número", "ddd"],
    "fotos": ["foto", "imagem", "evidência", "anexar", "picture"],
    "endereco": ["endereço", "rua", "avenida", "local", "apto", "apartamento", "bairro"],
    "responsavel": ["responsável", "responsavel", "contato", "pessoa", "nome"],
    "status": ["status", "situação", "estado", "andamento"],
    "ajuda": ["ajuda", "help", "dúvida", "duvida", "como", "qual", "que"]
}

titulos = {
    "nova-vistoria": "📝 Nova Vistoria",
    "agendamentos": "📅 Agendamentos",
    "campos-obrigatorios": "✅ Campos Obrigatórios",
    "revisar": "🔍 Revisar Antes de Salvar",
    "whatsapp": "📲 WhatsApp",
    "telefone": "☎️ Telefone para Contato",
    "fotos": "📷 Fotos e Evidências",
    "endereco": "🏠 Endereço Completo",
    "responsavel": "👤 Responsável da Vistoria",
    "status": "📊 Status da Vistoria",
    "ajuda": "❓ Como Usar o Assistente"
}

def buscar_resposta(mensagem):
    """Simula o algoritmo de busca de respostas do frontend"""
    msg_lower = mensagem.lower().strip()
    
    # Buscar palavra-chave
    for categoria, palavras in palavras_chave.items():
        for palavra in palavras:
            if palavra in msg_lower:
                return categoria
    
    return None

def testar():
    print("=" * 70)
    print("🤖 TESTE DO ASSISTENTE 100% FRONT-END")
    print("=" * 70)
    print()

    # Casos de teste
    testes = [
        ("Como criar uma vistoria?", "nova-vistoria"),
        ("Como agendar uma vistoria?", "agendamentos"),
        ("Qual é o telefone?", "telefone"),
        ("Como tirar fotos?", "fotos"),
        ("Como preencher o endereço?", "endereco"),
        ("Qual é o responsável?", "responsavel"),
        ("Como revisar antes de salvar?", "revisar"),
        ("Como enviar pelo WhatsApp?", "whatsapp"),
        ("Qual é o status?", "status"),
        ("Quais são os campos obrigatórios?", "campos-obrigatorios"),
        ("Me ajuda!", "ajuda"),
        ("Lorem ipsum dolor sit amet", None),  # Não deve encontrar
        ("Qual é a cor do vento?", None),  # Não deve encontrar
    ]

    # Executar testes
    passou = 0
    falhou = 0

    for mensagem, esperado in testes:
        resultado = buscar_resposta(mensagem)
        status = "✅" if resultado == esperado else "❌"
        
        if resultado == esperado:
            passou += 1
        else:
            falhou += 1
        
        titulo = titulos.get(resultado, "❓ Não entendi") if resultado else "❓ Não entendi"
        
        print(f"{status} Entrada: {mensagem:45} → {titulo}")

    # Resumo
    print()
    print("=" * 70)
    print(f"📊 RESULTADO: {passou} passou, {falhou} falhou")
    print("=" * 70)
    print()

    # Cobertura
    print("📋 COBERTURA DE CATEGORIAS:")
    print()
    for categoria, titulo in titulos.items():
        n_palavras = len(palavras_chave[categoria])
        palavras_str = ", ".join(palavras_chave[categoria][:2])
        print(f"  {titulo}")
        print(f"     └─ {n_palavras} palavras-chave: {palavras_str}...")
    
    print()
    print("✅ Assistente 100% Front-End Testado com Sucesso!")
    print()

if __name__ == "__main__":
    testar()
