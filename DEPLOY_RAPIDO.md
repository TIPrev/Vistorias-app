# ⚡ DEPLOY RÁPIDO - 5 PASSOS

## Passo 1: Preparar (5 min)

```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Fazer login
firebase login

# 3. Inicializar Git
cd "C:\Users\Guest\Desktop\BRF Docs\Vistoria"
git init
git add .
git commit -m "Vistoria App Deploy"
```

## Passo 2: Criar conta Railway (2 min)

- Abra https://railway.app
- Clique "Sign Up"
- Use GitHub ou email

## Passo 3: Criar repositório GitHub (3 min)

1. Abra https://github.com/new
2. Crie repositório: `vistoria-app`
3. Copie o endereço (https ou SSH)
4. No terminal:
```bash
git remote add origin https://github.com/SEU_USUARIO/vistoria-app.git
git push -u origin main
```

## Passo 4: Deploy Backend (5 min)

1. Abra Railway Dashboard
2. Clique "New Project"
3. Selecione "Deploy from GitHub"
4. Selecione `vistoria-app`
5. Railway faz deploy automático
6. Copie a URL pública (ex: `xyz.up.railway.app`)

## Passo 5: Deploy Frontend (2 min)

```bash
firebase deploy --only hosting
```

Pronto! 🎉

- Frontend: https://vistorias-app-a73c9.web.app
- Backend: https://xyz.up.railway.app

---

**Total: ~20 minutos**

## ⚠️ Dúvidas?

- Leia `DEPLOY_GUIDE.md` (passo-a-passo completo)
- Veja `config.js.env` (configuração automática)
- Execute `python deploy.py` (deploy automático)
