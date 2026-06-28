# Configuração gratuita do Firebase

## 1. Criar e configurar o projeto

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/) usando o plano gratuito Spark.
2. Em **Configurações do projeto > Seus apps**, adicione um app Web e copie o objeto `firebaseConfig`.
3. Preencha os mesmos campos em `config.js`. Em `siteUrl`, informe a URL HTTPS do Render sem barra final, por exemplo `https://seu-app.onrender.com`.

A configuração Web do Firebase é pública. A proteção efetiva dos dados é feita por `firestore.rules`.

## 2. Ativar login

1. Abra **Authentication > Sign-in method**.
2. Ative **E-mail/senha**.
3. Em **Authentication > Settings > Authorized domains**, adicione somente o domínio, por exemplo `seu-app.onrender.com`.
4. Abra **Authentication > Users > Add user** e crie o administrador inicial. Sugestão: `admin@vistoria.local`, com uma senha forte.

No formulário, o usuário também poderá digitar apenas `admin`; o app acrescentará `@vistoria.local`.

## 3. Criar Firestore e publicar as regras

1. Abra **Firestore Database > Create database**.
2. Escolha o modo de produção e uma região adequada.
3. Abra a aba **Rules**, substitua o conteúdo por `firestore.rules` e clique em **Publish**.

Alternativamente, com a Firebase CLI configurada para o projeto, execute `firebase deploy --only firestore:rules`. O arquivo `firebase.json` já referencia as regras corretas.

As coleções `usuarios`, `vistorias`, `agendamentos` e `confirmacoesPublicas` serão criadas automaticamente no primeiro uso.

## 4. Configurar as rotas no Render

No painel do Render, abra **Static Site > Redirects/Rewrites** e adicione:

- **Source:** `/*`
- **Destination:** `/index.html`
- **Action:** `Rewrite`

Use **Publish Directory** igual a `.`. Essa regra mantém funcionando:

- `/agendamento/confirmar/{token}`
- `/agendamento/reagendar/{token}`

## 5. Migrar os dados do aparelho

Depois de publicar novamente:

1. Entre com o usuário que deve ser dono dos dados existentes.
2. Toque em **Sincronizar dados deste aparelho**.
3. Confirme a operação.

O app mantém o conteúdo no `localStorage`. Cada gravação usa um identificador determinístico para impedir duplicação ao repetir a sincronização. Dados de contas diferentes ficam separados também no cache local.

## Segurança do link público

O agendamento completo nunca é público. O link acessa apenas `confirmacoesPublicas/{token}`, que contém identificadores internos, status e timestamps. As regras:

- proíbem listagem anônima;
- proíbem criação e exclusão anônimas;
- permitem alterar somente status e o timestamp correspondente;
- aceitam exclusivamente `Confirmado` ou `Reagendar`;
- bloqueiam respostas em itens cancelados ou finalizados.

Como não existe backend ou Cloud Function, qualquer pessoa que receba o link pode responder. O token UUID aleatório deve ser tratado como segredo e não deve ser publicado fora da mensagem destinada ao responsável.

O projeto não usa backend próprio, cron, WhatsApp API ou dependência paga. Observe os limites gratuitos do plano Spark no Firebase Console.
