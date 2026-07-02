# ✅ CHECKLIST DE DEPLOY

## Pré-deploy (Preparação - FEITO ✅)

- [x] Backend Python pronto (app.py + assistente_service.py)
- [x] Frontend PWA pronto (index.html + css + js)
- [x] Firebase Firestore configurado
- [x] requirements.txt com dependências
- [x] Procfile para Railway
- [x] Dockerfile para containerização
- [x] railroad.toml para configuração
- [x] config.js.env com detecção automática de ambiente
- [x] firebase.json com hosting configurado
- [x] CORS configurado em app.py
- [x] assistant.js usando config dinâmica

## Configuração Git (Faça Agora!)

### 1. Criar repositório GitHub

1. [ ] Abra https://github.com/new
2. [ ] Nome: `vistoria-app`
3. [ ] Descrição: "App de Vistorias com Chat IA"
4. [ ] Público (recomendado)
5. [ ] Crie o repositório

### 2. Fazer Push Local

```bash
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
git init
git add .
git commit -m "Vistoria App - Deploy Preparation"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/vistoria-app.git
git push -u origin main
```

## Deploy Backend (Railway)

### 1. Criar Conta Railway

- [ ] Abra https://railway.app
- [ ] Sign up (GitHub recomendado)
- [ ] Conecte sua conta GitHub

### 2. Criar Novo Projeto

- [ ] Dashboard → New Project
- [ ] GitHub → Connect
- [ ] Selecione repositório `vistoria-app`
- [ ] Railway detecta Python automaticamente
- [ ] Deploy inicia automaticamente

### 3. Configurar Variáveis

- [ ] Abra seu projeto Railway
- [ ] Variables
- [ ] Adicione:
  ```env
  ENVIRONMENT=production
  DEBUG=False
  ```

### 4. Ativar Domínio

- [ ] Deployments
- [ ] Clique na deploy
- [ ] Railway Domain → Habilitar
- [ ] Copie URL pública

**Resultado:** `https://xyz.up.railway.app` ✅

## Deploy Frontend (Firebase)

### 1. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Fazer Login

```bash
firebase login
```

### 3. Fazer Deploy

```bash
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
firebase deploy --only hosting
```

**Resultado:** `https://vistorias-app-a73c9.web.app` ✅

## Pós-Deploy (Verificação)

- [ ] Frontend carrega em `https://vistorias-app-a73c9.web.app`
- [ ] Backend responde em `https://xyz.up.railway.app`
- [ ] API funciona: `https://xyz.up.railway.app/assistente/chat` (POST)
- [ ] Chat funciona no app
- [ ] Dark mode funciona
- [ ] Botões rápidos funcionam
- [ ] Firebase Firestore funciona
- [ ] Login funciona
- [ ] Responsive em mobile
- [ ] PWA instala em mobile

## Monitoramento (Depois de Deploy)

### Firebase Console
- [ ] Abra https://console.firebase.google.com
- [ ] Selecione projeto `vistorias-app-a73c9`
- [ ] Monitor Hosting → Deployments
- [ ] Monitor Firestore → Dados
- [ ] Monitor Authentication → Usuários

### Railway Dashboard
- [ ] Abra https://railway.app
- [ ] Selecione projeto `vistoria-app`
- [ ] Veja Deployments → Logs
- [ ] Monitore CPU e Memória
- [ ] Alertas (opcional)

## Atualizações Futuras

### Atualizar Frontend
```bash
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
# Fazer mudanças
firebase deploy --only hosting
```

### Atualizar Backend
```bash
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
git add .
git commit -m "Sua mensagem"
git push origin main
# Railway faz deploy automático
```

## Suporte Rápido

| Problema | Solução |
|----------|---------|
| Firebase CLI não instala | `npm install -g firebase-tools --legacy-peer-deps` |
| Login Firebase falha | Limpe cache: `firebase logout && firebase login` |
| Git não existe | `git init && git add . && git commit -m "init"` |
| Railway não encontra Python | Verifique `Procfile` e `requirements.txt` |
| CORS error | Verifique `AppConfig.ASSISTENTE_URL` em console |
| Chat lento | Normal no Railway free tier (primeiro pedido ~2s) |

## Status Final

- ✅ Frontend em produção
- ✅ Backend em produção
- ✅ Banco de dados em produção
- ✅ Chat integrado e funcionando
- ✅ App instalável em mobile
- ✅ Auto-deploy via Git habilitado

## 🎉 Parabéns!

Seu app está no ar!

**Compartilhe:** https://vistorias-app-a73c9.web.app

---

**Data de Deploy:** 2026-07-02  
**Status:** Pronto para Produção  
**Tempo Estimado:** 30-45 minutos  
**Custo Mensal:** ~$5 USD (Railway)
