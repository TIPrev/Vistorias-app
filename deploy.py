#!/usr/bin/env python3
# ============================================================
# DEPLOY AUTOMÁTICO - FIREBASE + RAILWAY
# ============================================================

import subprocess
import sys
import os
from datetime import datetime

class Deployer:
    def __init__(self):
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.project_dir = os.path.dirname(os.path.abspath(__file__))
        
    def run_command(self, cmd, description):
        """Executar comando e mostrar resultado"""
        print(f"\n📦 {description}...")
        print(f"   Comando: {cmd}\n")
        
        try:
            result = subprocess.run(cmd, shell=True, check=True, cwd=self.project_dir)
            print(f"✅ {description} concluído!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Erro ao {description}: {e}")
            return False
    
    def deploy_frontend(self):
        """Deploy Frontend no Firebase"""
        print("\n" + "="*60)
        print("🔵 FRONTEND - FIREBASE HOSTING")
        print("="*60)
        
        if not self.run_command(
            "firebase deploy --only hosting",
            "Deploy Frontend"
        ):
            return False
        
        print("\n✅ Frontend no ar!")
        print("   URL: https://vistorias-app-a73c9.web.app")
        return True
    
    def deploy_backend_github(self):
        """Fazer push para GitHub (Railway faz deploy automático)"""
        print("\n" + "="*60)
        print("🐍 BACKEND - GITHUB PUSH (Railway auto-deploy)")
        print("="*60)
        
        # Verificar se git existe
        if not os.path.exists(os.path.join(self.project_dir, ".git")):
            print("⚠️  Git não inicializado. Execute:")
            print("   git init")
            print("   git add .")
            print("   git commit -m 'Initial commit'")
            print("   git remote add origin https://github.com/SEU_USUARIO/vistoria-app.git")
            print("   git push -u origin main")
            return False
        
        # Add e commit
        if not self.run_command(
            f"git add -A && git commit -m 'Deploy {self.timestamp}'",
            "Git commit"
        ):
            print("⚠️  Nada para fazer commit ou erro no git")
            return False
        
        # Push
        if not self.run_command(
            "git push origin main",
            "Git push"
        ):
            return False
        
        print("\n✅ Backend atualizado!")
        print("   Railway fará deploy automático em ~2 minutos")
        return True
    
    def run(self, target="all"):
        """Executar deploy"""
        print(f"\n🚀 VISTORIA APP - DEPLOY AUTOMÁTICO")
        print(f"   Timestamp: {self.timestamp}")
        print(f"   Alvo: {target}")
        
        success = True
        
        if target in ["all", "frontend"]:
            if not self.deploy_frontend():
                success = False
        
        if target in ["all", "backend"]:
            if not self.deploy_backend_github():
                success = False
        
        # Resultado final
        print("\n" + "="*60)
        if success:
            print("✅ DEPLOY BEM-SUCEDIDO!")
            print("="*60)
            print("\n📊 Status:")
            print("   Frontend: https://vistorias-app-a73c9.web.app")
            print("   Backend: Verificar Railway Dashboard")
            print("   Firestore: https://console.firebase.google.com/project/vistorias-app-a73c9")
            return 0
        else:
            print("❌ DEPLOY COM ERROS!")
            print("="*60)
            return 1

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else "all"
    
    if target not in ["all", "frontend", "backend"]:
        print(f"❌ Alvo inválido: {target}")
        print("   Use: python deploy.py [all|frontend|backend]")
        sys.exit(1)
    
    deployer = Deployer()
    exit_code = deployer.run(target)
    sys.exit(exit_code)
