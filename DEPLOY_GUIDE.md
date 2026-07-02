# 🚀 Deploy - Firebase Hosting + Railway

## 📋 Visão Geral

- **Frontend:** Firebase Hosting (gratuito)
- **Backend:** Railway (gratuito, $5/mês após trial)
- **Banco de dados:** Firestore (já configurado)

## ✅ Pré-requisitos

- [ ] Conta Firebase (você já tem - projeto vistorias-app-a73c9)
- [ ] Conta Railway (grátis em https://railway.app)
- [ ] Git instalado
- [ ] Node.js instalado (com npm)
- [ ] Python 3.8+ instalado

## 🔧 Passo 1: Preparar Ambiente Local

### Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### Fazer Login no Firebase

```bash
firebase login
```

Isso abrirá o navegador para você fazer login com sua conta Google.

### Verificar Projeto

```bash
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
firebase list
```

Deve aparecer: `vistorias-app-a73c9` ✅

## 🎯 Passo 2: Deploy Frontend no Firebase Hosting

### 1. Construir para produção

```bash
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
```

### 2. Fazer deploy

```bash
firebase deploy --only hosting
```

**Resultado esperado:**
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/vistorias-app-a73c9/overview
Hosting URL: https://vistorias-app-a73c9.web.app
```

✅ **Frontend está no ar!**

## 🐍 Passo 3: Deploy Backend no Railway

### 1. Criar Conta e Projeto Railway

- Abra https://railway.app
- Faça login com GitHub (recomendado) ou email
- Clique em "New Project"

### 2. Conectar Repositório (Recomendado)

**Opção A - Com GitHub (Melhor):**

1. Faça push do projeto para GitHub:
```bash
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
git init
git add .
git commit -m "Deploy Vistoria App"
git remote add origin https://github.com/SEU_USUARIO/vistoria-app.git
git push -u origin main
```

2. No Railway:
   - Clique "New Project"
   - Selecione "Deploy from GitHub"
   - Selecione seu repositório `vistoria-app`
   - Railway detectará Python automaticamente
   - Deploy comienza automáticamente ✅

**Opção B - Sem GitHub (Deploy Manual):**

1. No Railway, clique "New"
2. Selecione "Docker"
3. Use o Dockerfile (vou criar abaixo)
4. Railway faz deploy

### 3. Variáveis de Ambiente

Após deploy iniciar, configure:

1. Abra seu projeto no Railway
2. Vá para "Variables"
3. Adicione:

```env
ENVIRONMENT=production
DEBUG=False
PORT=5000
```

### 4. Ativar Domínio Público

1. Abra seu projeto no Railway
2. Vá para "Deployments"
3. Clique na sua deploy
4. Configure "Railway Domain"
5. Copie a URL pública (ex: `vistoria-backend-xyz.up.railway.app`)

✅ **Backend está no ar!**

## 🔗 Passo 4: Conectar Frontend ao Backend

### 1. Copiar URL do Backend

Do Railway, copie a URL pública (ex: `vistoria-backend-xyz.up.railway.app`)

### 2. Atualizar config.js.env

Edite `config.js.env` e altere:

```javascript
API_BASE_URL = 'https://vistoria-backend-xyz.up.railway.app';
```

Ou deixe o código detectar automaticamente (recomendado).

### 3. Fazer Deploy do Frontend Novamente

```bash
firebase deploy --only hosting
```

## ✅ Verificar Deploy

### Frontend
Abra no navegador:
```
https://vistorias-app-a73c9.web.app
```

Deve carregar normal.

### Backend
Teste API:
```bash
curl https://vistoria-backend-xyz.up.railway.app/
```

Deve retornar:
```json
{
  "status": "ok",
  "message": "Servidor Vistoria App está rodando"
}
```

### Chat
1. Abra o app
2. Clique na bolinha verde (Assistente)
3. Digite uma pergunta
4. Deve receber resposta do backend em produção

## 📊 Monitorar Deploy

### Firebase
- Dashboard: https://console.firebase.google.com/project/vistorias-app-a73c9
- Hosting: Vá para "Hosting" para ver histórico de deploys

### Railway
- Dashboard: https://railway.app
- Logs: Veja `Logs` para erros em tempo real
- Métricas: CPU, memória, rede

## 🔄 Atualizações Futuras

### Atualizar Frontend

```bash
# Fazer mudanças em index.html, style.css, etc
firebase deploy --only hosting
```

### Atualizar Backend

```bash
# Fazer mudanças em app.py, assistente_service.py, etc
git push origin main
# Railway faz deploy automático
```

## 🚨 Troubleshooting

### "Deploy completo mas site não funciona"
- Limpe cache: Ctrl+Shift+Delete
- Force refresh: Ctrl+Shift+R
- Aguarde 5 minutos (CDN update)

### "Chat não conecta ao backend"
- Abra DevTools (F12 → Console)
- Veja erro CORS ou conexão
- Verifique URL no config.js.env
- Backend está rodando no Railway?

### "Railway diz 'Build failed'"
- Verifique `requirements.txt` (faltam dependências?)
- Verifique `Procfile` (sintaxe correta?)
- Veja logs em "Deployments"

### "Muito lento"
- Railway free tier tem limites
- Upgrade para $5/mês se necessário
- Firestore pode estar lento (check index)

## 💰 Custos

| Serviço | Custo | Notas |
|---------|-------|-------|
| Firebase Hosting | Grátis | 10GB/mês grátis |
| Firebase Firestore | Grátis | 50K read/dia grátis |
| Railway | $5/mês | Depois do trial grátis |
| **TOTAL** | **$5/mês** | Muito barato! |

## 🔐 Segurança em Produção

- ✅ CORS habilitado (apenas necessário)
- ✅ HTTPS automático (Firebase + Railway)
- ✅ Firebase Authentication ativo
- ⚠️ TODO: Adicionar rate limiting
- ⚠️ TODO: Adicionar autenticação na API

## 📱 Rollback (Se algo quebrar)

### Firebase
```bash
firebase deploy --only hosting:[versão]
# Ver histórico de versões no console
```

### Railway
```bash
# No dashboard, selecione deploy anterior
# Clique "Redeploy"
```

## 🎉 Pronto!

Seu app agora está no ar!

- **Frontend:** https://vistorias-app-a73c9.web.app
- **Backend API:** https://vistoria-backend-xyz.up.railway.app/assistente/chat

Compartilhe com os usuários! 🚀

---

**Tempo estimado:** 30-45 minutos  
**Próximos passos:** Monitorar, coletar feedback, iterar
