# ✅ Guia de Início - Assistente de Vistoria com Chat

## 📋 Pré-requisitos

- [ ] Windows (ou macOS/Linux)
- [ ] Conexão com internet (para download do Python)
- [ ] Visual Studio Code ou editor de texto

## 🔧 Passo 1: Instalar Python

### Windows

1. [ ] Abra https://www.python.org/downloads/
2. [ ] Clique em "Download Python 3.11.x" (ou 3.10+)
3. [ ] Execute o instalador
4. [ ] ⚠️ **IMPORTANTE:** Marque "Add Python to PATH"
5. [ ] Clique em "Install Now"
6. [ ] Aguarde até terminar
7. [ ] Feche o instalador

### Verificar instalação

1. [ ] Abra Prompt de Comando (cmd.exe)
2. [ ] Digite: `python --version`
3. [ ] Deve aparecer: `Python 3.10.x` ou superior

## 📦 Passo 2: Instalar Dependências

1. [ ] Abra Prompt de Comando
2. [ ] Navegue para o projeto:
   ```
   cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
   ```
3. [ ] Digite: `pip install -r requirements.txt`
4. [ ] Aguarde até ver "Successfully installed"

## 🚀 Passo 3: Iniciar Servidor

### Opção A - Executável (Recomendado)

1. [ ] Navegue até: `C:\Users\Guest\Desktop\BRF Docs\Vistoria`
2. [ ] Dê dois cliques em `iniciar_servidor.bat`
3. [ ] Uma janela deve abrir com:
   ```
   🚀 Iniciando Vistoria App Backend
      Porta: 5000
   ```
4. [ ] **Deixe essa janela aberta enquanto usa o app**

### Opção B - Terminal

1. [ ] Abra Prompt de Comando
2. [ ] Navegue para o projeto:
   ```
   cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
   ```
3. [ ] Digite: `python app.py`
4. [ ] Deve aparecer:
   ```
   🚀 Iniciando Vistoria App Backend
      Porta: 5000
      URL: http://localhost:5000
   ```

## ✅ Passo 4: Verificar se Funcionou

1. [ ] Abra seu navegador (Chrome, Firefox, Edge)
2. [ ] Digite: `http://localhost:5000`
3. [ ] Deve aparecer:
   ```json
   {
     "status": "ok",
     "message": "Servidor Vistoria App está rodando"
   }
   ```

Se não aparecer:
- [ ] Verifique se o servidor.bat ou `python app.py` está rodando
- [ ] Feche e reabra
- [ ] Verifique se Python foi instalado corretamente

## 📱 Passo 5: Usar o App

1. [ ] Abra `index.html` no navegador
2. [ ] Faça login normalmente
3. [ ] Você verá a bolinha verde de **"Ajuda"** no canto inferior direito
4. [ ] Clique na bolinha
5. [ ] O modal do assistente abre
6. [ ] Digite sua pergunta e pressione **Enter**
7. [ ] Aguarde a resposta

## 🧪 Passo 6: Testar API (Opcional)

1. [ ] Abra Prompt de Comando
2. [ ] Navegue para o projeto:
   ```
   cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
   ```
3. [ ] Digite: `python teste_api.py`
4. [ ] Deve aparecer:
   ```
   ✅ Servidor está rodando!
   🔄 Testando 12 mensagens...
   ```

## 🎓 Exemplos de Perguntas

Digite no chat:

- [ ] "Como criar uma nova vistoria?"
- [ ] "Quais são os campos obrigatórios?"
- [ ] "Como enviar pelo WhatsApp?"
- [ ] "Como revisar antes de salvar?"
- [ ] "Qual é o telefone do cliente?"
- [ ] "Como preencher o endereço?"

## 🛑 Para Parar o Servidor

### Se usou .bat:
- Feche a janela

### Se usou terminal:
- Pressione **Ctrl+C** no terminal

## 🔄 Para Reiniciar

1. [ ] Feche o servidor
2. [ ] Aguarde 2 segundos
3. [ ] Abra novamente (seguindo Passo 3)

## ❓ Dúvidas Frequentes

### "Conectando recusada"
- [ ] O servidor não está rodando
- [ ] Abra `iniciar_servidor.bat` ou execute `python app.py`
- [ ] Verifique se está em `http://localhost:5000`

### "ModuleNotFoundError: No module named 'flask'"
- [ ] Python não tem Flask instalado
- [ ] Execute: `pip install -r requirements.txt`

### "Python não é reconhecido"
- [ ] Python não foi adicionado ao PATH
- [ ] Desinstale e reinstale marcando "Add Python to PATH"

### "O chat não responde"
- [ ] Abra o console (F12) e veja se há erros
- [ ] Verifique se o servidor está rodando
- [ ] Recarregue a página (Ctrl+F5)

### "Servidor lento"
- [ ] Normal para primeira requisição
- [ ] Próximas são rápidas
- [ ] Reinicie se ficar muito lento

## 🔐 Segurança

⚠️ **IMPORTANTE:**

- Este servidor é APENAS para desenvolvimento local
- ❌ Não use em produção na internet
- ❌ Não compartilhe a porta 5000 externamente
- ✅ Use apenas na rede interna da empresa

## 📝 Estrutura de Arquivos

```
Vistoria/
├── app.py                  ← Servidor
├── assistente_service.py   ← Lógica
├── iniciar_servidor.bat    ← Executável Windows
├── teste_api.py           ← Teste
├── requirements.txt       ← Dependências
├── .env                   ← Configuração
├── index.html             ← App
├── css/
│   └── js/
│       └── assistant.js   ← Chat
└── BACKEND_SETUP.md       ← Documentação técnica
```

## 🎯 Próximos Passos

Depois de funcionando:

1. [ ] Teste em mobile
2. [ ] Verifique respostas
3. [ ] Personalize respostas (edite `assistente_service.py`)
4. [ ] Use em produção local
5. [ ] Recolha feedback dos usuários

## 📞 Suporte

Se não conseguir:

1. [ ] Leia `BACKEND_SETUP.md` (mais detalhes)
2. [ ] Leia `README_ASSISTENTE.md` (instruções)
3. [ ] Abra console (F12) para ver erros
4. [ ] Verifique logs do servidor

---

✅ **Parabéns!** Seu assistente de vistoria com chat está pronto!

**Tempo estimado:** 10-15 minutos (incluindo download do Python)
