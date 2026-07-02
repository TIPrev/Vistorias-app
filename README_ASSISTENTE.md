# 🎯 Assistente de Vistoria - Chat com Backend Python

## Visão Geral da Evolução

O Assistente de Vistoria foi transformado de um simples menu de botões em um **chat inteligente com backend Python**, mantendo:

- ✅ Arquitetura PWA intacta
- ✅ Firebase sem mudanças
- ✅ Login e fluxo principal preservados
- ✅ Sem dependências externas/APIs pagas
- ✅ Fallback seguro se o servidor falhar

## 🏗️ Estrutura Técnica

```
Frontend (PWA)              Backend (Python)
┌─────────────────┐        ┌──────────────────┐
│   index.html    │        │    app.py        │
│ + assistant.js  │ ◄──►   │  (Flask 5000)    │
│ + style.css     │        │                  │
└─────────────────┘        │ assistente_      │
                           │ service.py       │
                           └──────────────────┘
                           
                           POST /assistente/chat
                           { mensagem } → { resposta }
```

## 📁 Arquivos Principais

### Backend
- **app.py** - Servidor Flask com rota POST /assistente/chat
- **assistente_service.py** - Processamento de mensagens com IA por palavras-chave
- **requirements.txt** - Dependências (Flask, Flask-CORS)
- **.env** - Configuração (PORT, DEBUG)

### Frontend
- **index.html** - Novo input + chat history no modal
- **css/style.css** - Estilos para input, botões, mensagens
- **css/js/assistant.js** - Integração com API + fallback

### Utilitários
- **iniciar_servidor.bat** - Script para Windows
- **teste_api.py** - Validar API
- **BACKEND_SETUP.md** - Documentação técnica

## 🚀 Início Rápido

### 1. Instalar Python (se não tiver)
- Baixe de https://www.python.org/downloads/
- Marque "Add Python to PATH"

### 2. Instalar Dependências
```bash
cd "c:\Users\Guest\Desktop\BRF Docs\Vistoria"
pip install -r requirements.txt
```

### 3. Iniciar Servidor

**Opção A - Windows CMD:**
```bash
python app.py
```

**Opção B - Executável:**
- Dê dois cliques em `iniciar_servidor.bat`

**Resultado esperado:**
```
🚀 Iniciando Vistoria App Backend
   Porta: 5000
   URL: http://localhost:5000
   Assistente Chat: POST http://localhost:5000/assistente/chat
```

### 4. Testar
```bash
python teste_api.py
```

## 💬 Como Usar o Chat

1. **Abra o app** em `index.html`
2. **Clique na bolinha verde** (Assistente de Vistoria)
3. **Digite sua pergunta** no campo de texto
4. **Pressione Enter** ou clique no botão de envio
5. **Veja a resposta** no chat

### Exemplos de Perguntas
- "Como criar uma nova vistoria?"
- "Quais são os campos obrigatórios?"
- "Como enviar pelo WhatsApp?"
- "Qual é o telefone do cliente?"
- "Como revisar antes de salvar?"

## 🤖 Categorias de Respostas

O assistente responde a 11 categorias:

| Categoria | Palavras-chave | 
|-----------|---|
| 📝 Nova Vistoria | nova vistoria, criar vistoria, preencher |
| 📅 Agendamentos | agendamentos, agendar, agenda |
| ✅ Campos Obrigatórios | campos, obrigatorio, o que precisa |
| 🔍 Revisar | revisar, conferir, checklist, antes de salvar |
| 📲 WhatsApp | whatsapp, mensagem, enviar mensagem |
| ☎️ Telefone | telefone, número, celular, ddd, contato |
| 📷 Fotos | foto, fotos, fotografia, imagem |
| 📍 Endereço | endereço, cep, rua, bairro, localização |
| 👤 Responsável | responsável, responsavel, responsavel pelo aceite |
| 🏷️ Status | status, estado, situação, qual é o status |
| ℹ️ Ajuda | ajuda, help, como funciona, como usar |

## 🔌 API

### Request
```bash
POST http://localhost:5000/assistente/chat
Content-Type: application/json

{
  "mensagem": "Como criar uma nova vistoria?"
}
```

### Response (sucesso)
```json
{
  "sucesso": true,
  "titulo": "📝 Nova Vistoria",
  "conteudo": "<p>Conteúdo HTML com resposta formatada</p>",
  "erro": null
}
```

### Response (erro)
```json
{
  "sucesso": false,
  "titulo": "Erro",
  "conteudo": "Mensagem de erro amigável",
  "erro": "Detalhes técnicos do erro"
}
```

## 🛡️ Tratamento de Erros

O sistema é robusto:

- ✅ Se o servidor não responder → Usa fallback local
- ✅ Se mensagem estiver vazia → Pede para digitar
- ✅ Se não entender → Sugestões de categorias
- ✅ Se assistente falhar → App continua funcionando
- ✅ Se rede cair → Fallback local com respostas em cache

## 📊 Tecnologias

### Frontend
- HTML5 + CSS3 + Vanilla JavaScript
- Fetch API para requisições
- LocalStorage para cache (futuro)

### Backend
- Python 3.8+
- Flask 2.3.3
- Flask-CORS 4.0.0
- Processamento com regex/palavras-chave

### Sem Dependências
- ❌ Sem IA paga (OpenAI, etc)
- ❌ Sem banco de dados (Firestore é separado)
- ❌ Sem APIs externas
- ❌ Sem autenticação complexa (local apenas)

## 🔧 Customização

### Adicionar Nova Resposta

**1. Edite `assistente_service.py`:**

```python
"meu-topico": {
    "titulo": "🆕 Meu Tópico",
    "conteudo": """<p>Conteúdo HTML aqui</p>"""
}
```

**2. Adicione palavras-chave:**

```python
"meu-topico": ["palavra1", "palavra2", "palavra3"]
```

### Mudar Porta

Edite `.env`:
```env
PORT=5001
```

## 📱 Responsivo

O chat funciona em:
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iPhone, Android)

Adaptações automáticas:
- Input menor em mobile
- Chat history com max-height
- Botões reduzidos
- Fonte ajustada

## 🌙 Temas

- ✅ Tema claro (padrão)
- ✅ Tema escuro (com suporte completo)

O chat segue as cores do app.

## 🧪 Testes

### Testar API
```bash
python teste_api.py
```

Testa:
- Conexão com servidor
- 11 mensagens de exemplo
- Formatos de resposta

### Testar em Produção
1. Verifique `http://localhost:5000/` no navegador
2. Abra DevTools (F12)
3. Vá para "Network"
4. Digite no chat
5. Veja a requisição POST em tempo real

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Conexão recusada" | Servidor não está rodando: `python app.py` |
| "ModuleNotFoundError" | Instalar deps: `pip install -r requirements.txt` |
| "CORS error" | Já está habilitado em app.py |
| Servidor lento | Reload: F5 ou Ctrl+Shift+R |
| Chat vazio | Verifique console (F12) para erros |

## 📈 Próximas Melhorias

- [ ] Persistência de chat em localStorage
- [ ] Histórico entre sessões
- [ ] Analytics de perguntas
- [ ] Sugestões contextuais
- [ ] Integração com campos de formulário
- [ ] Temas personalizáveis
- [ ] Suporte a múltiplos idiomas

## 📝 Notas Importantes

- ⚠️ Este servidor é LOCAL apenas (não use em produção sem HTTPS)
- ⚠️ Sem autenticação (apenas para uso interno)
- ⚠️ Não guarda histórico entre reinicializações
- ⚠️ Rate limiting não implementado

## 🎓 Exemplos de Uso

### Via Terminal (cURL)
```bash
curl -X POST http://localhost:5000/assistente/chat \
  -H "Content-Type: application/json" \
  -d "{\"mensagem\": \"Como criar vistoria?\"}"
```

### Via JavaScript
```javascript
const resp = await fetch('http://localhost:5000/assistente/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mensagem: 'Sua pergunta' })
});
const data = await resp.json();
console.log(data.conteudo);
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique se Python está instalado: `python --version`
2. Verifique dependências: `pip list`
3. Veja logs do servidor (rodando em terminal)
4. Abra console (F12) e veja erros JavaScript
5. Teste API diretamente: `python teste_api.py`

---

**Versão:** 1.0  
**Data:** 2026-07-02  
**Status:** ✅ Produção Local Pronta

🚀 Pronto para usar!
