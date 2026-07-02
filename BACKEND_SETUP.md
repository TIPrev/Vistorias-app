# Backend Python - Assistente de Vistoria

## Visão Geral

O Assistente de Vistoria foi evoluído para usar um backend Python com Flask. O assistente agora:

- Processa mensagens de usuários em tempo real
- Responde usando regras baseadas em palavras-chave (sem IA cara)
- Mantém um histórico de chat simples
- Oferece fallback local se o servidor não responder
- Suporta os 5 botões rápidos originais

## Requisitos

- Python 3.8+
- pip (gerenciador de pacotes Python)

## Instalação

### 1. Instalar Python
- Windows: Baixe em https://www.python.org/downloads/
- Certifique-se de marcar "Add Python to PATH" durante instalação

### 2. Instalar dependências

```bash
cd "c:\Users\Guest\Desktop\BRF Docs\Vistoria"
pip install -r requirements.txt
```

### 3. Verificar instalação

```bash
python --version
pip list
```

## Como iniciar o servidor

### Opção 1: Linha de comando

```bash
cd "c:\Users\Guest\Desktop\BRF Docs\Vistoria"
python app.py
```

Você verá:
```
🚀 Iniciando Vistoria App Backend
   Porta: 5000
   Debug: True
   URL: http://localhost:5000
   Assistente Chat: POST http://localhost:5000/assistente/chat
```

### Opção 2: CMD do Windows

1. Abra Prompt de Comando (cmd.exe)
2. Navegue até a pasta:
   ```
   cd C:\Users\Guest\Desktop\BRF Docs\Vistoria
   ```
3. Execute:
   ```
   python app.py
   ```

## Estrutura dos Arquivos

```
c:\Users\Guest\Desktop\BRF Docs\Vistoria\
├── app.py                    # Servidor Flask principal
├── assistente_service.py    # Lógica do assistente
├── requirements.txt         # Dependências Python
├── .env                     # Configurações de ambiente
├── index.html               # Frontend (PWA)
├── css/
│   ├── style.css            # Estilos (inclui CSS do chat)
│   └── js/
│       ├── app.js
│       ├── assistant.js     # Integração com API
│       ├── calculadora.js
│       └── memoria.js
```

## API do Assistente

### Endpoint: POST /assistente/chat

**Request:**
```json
{
  "mensagem": "Como criar uma nova vistoria?"
}
```

**Response (sucesso):**
```json
{
  "sucesso": true,
  "titulo": "📝 Nova Vistoria",
  "conteudo": "<p>Conteúdo HTML da resposta</p>",
  "erro": null
}
```

**Response (erro):**
```json
{
  "sucesso": false,
  "titulo": "Erro",
  "conteudo": "Mensagem de erro",
  "erro": "Descrição do erro"
}
```

## Palavras-chave suportadas

O assistente responde a perguntas que contenham:

- **nova vistoria** / criar vistoria / preencher vistoria
- **agendamentos** / agendar / agenda
- **campos obrigatorios** / campos / o que precisa
- **revisar** / conferir / antes de salvar / checklist
- **whatsapp** / mensagem whatsapp / enviar mensagem
- **telefone** / número / celular / contato / ddd
- **fotos** / fotografia / imagem
- **endereço** / cep / rua / bairro
- **responsável** / responsavel / responsavel pelo aceite
- **status** / estado / situação
- **ajuda** / help / como funciona

## Respostas Padrão

Se o assistente não entender a mensagem:
```
"Não entendi totalmente sua pergunta. 
Posso ajudar com: Nova vistoria, Agendamentos, Campos obrigatórios, 
Revisão antes de salvar, Mensagem WhatsApp, Telefone, Fotos, 
Endereço, Responsável, Status"
```

## Troubleshooting

### Erro: "ModuleNotFoundError: No module named 'flask'"
**Solução:** Instale as dependências:
```bash
pip install -r requirements.txt
```

### Erro: "Address already in use"
**Solução:** A porta 5000 já está em uso. Altere em `.env`:
```env
PORT=5001
```

### Erro: "CORS error" no frontend
**Solução:** Certifique-se de que:
1. O servidor está rodando em http://localhost:5000
2. CORS está habilitado (já está em app.py)

### Frontend não conecta ao assistente
**Solução:** Verifique:
1. Se o servidor Flask está rodando: `http://localhost:5000/`
2. Se há erro na console (F12 → Console)
3. Tente recarregar a página (Ctrl+F5)

## Ambiente de Desenvolvimento

### Ativar modo de debug

Edite `.env`:
```env
DEBUG=True
```

### Ver logs em tempo real

Execute com:
```bash
python app.py
```

Os logs aparecerão no terminal.

## Customização

### Adicionar nova resposta

Edite `assistente_service.py`, na seção `RESPOSTAS`:

```python
"sua-chave": {
    "titulo": "🆕 Seu Título",
    "conteudo": """<p>Seu conteúdo HTML aqui</p>"""
}
```

Depois adicione palavras-chave em `PALAVRAS_CHAVE`:

```python
"sua-chave": ["palavra1", "palavra2", "palavra3"]
```

### Modificar resposta padrão

Edite `_resposta_nao_entendeu()` em `assistente_service.py`.

## Segurança

- ❌ Não use a API sem autenticação em produção
- ❌ Não coloque dados sensíveis no `.env` deste projeto
- ✅ Use HTTPS em produção
- ✅ Implemente rate limiting para evitar abuso

## Próximas melhorias

- [ ] Persistência de histórico de chat
- [ ] Análise de sentimento
- [ ] Sugestões baseadas em contexto
- [ ] Suporte a múltiplos idiomas
- [ ] Integração com banco de dados

## Suporte

Se encontrar problemas:
1. Verifique se o Python está instalado: `python --version`
2. Verifique se as dependências foram instaladas: `pip list`
3. Verifique os logs no terminal do servidor
4. Verifique a console do navegador (F12)

---

**Versão:** 1.0  
**Última atualização:** 2026-07-02
