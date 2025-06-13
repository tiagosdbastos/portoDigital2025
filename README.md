
# Índice de Eventos - Ecossistema de Inovação

Este projeto tem como objetivo fomentar o ecossistema de inovação, oferecendo uma plataforma de visualização de eventos de tecnologia e inovação. Ele permite que investidores, stakeholders e interessados encontrem oportunidades e conexões valiosas para futuros negócios.

---

## 🌐 Visão Geral

A aplicação está dividida em duas partes principais:

- **Client**: Interface web construída com Vite + React, responsável por exibir os dados de eventos.
- **Server**: Backend responsável por raspagem de eventos e integração com Firebase Firestore.

---

## 🚀 Tecnologias Utilizadas

### Frontend (Client)
- **React**
- **Vite**
- **Firebase SDK (client-side)**
- **HTML, CSS, JavaScript**

### Backend (Server)
- **Node.js**
- **Express**
- **Firebase Admin SDK**
- **Puppeteer** (para raspagem de dados)

---

## 📁 Estrutura de Pastas

```
PortoDigital2025/
│
├── Client/
│   ├── .firebase/                   # Configurações internas do Firebase CLI
│   ├── dist/                        # Build final do Vite
│   ├── node_modules/               # Dependências do frontend
│   ├── public/                     # Arquivos estáticos
│   ├── src/                        # Código-fonte da aplicação React
│   │   ├── assets/                 # Imagens e ícones
│   │   ├── components/             # Componentes reutilizáveis
│   │   └── services/               # Configuração do Firebase client-side
│   ├── .firebaserc                 
│   ├── .gitignore                  
│   ├── eslint.config.js           
│   ├── firebase.json              
│   ├── index.html                 
│   ├── package.json               
│   ├── package-lock.json          
│   └── vite.config.js             
│
├── Server/
│   ├── node_modules/              
│   ├── routes/                    
│   ├── firebase-admin.js         
│   ├── index.js    
│   ├── package.json              
│   ├── package-lock.json          
│   ├── serviceAccountKey.json         # NÃO deve ser versionado
│   └── serviceAccountKey.example.json # Exemplo para configuração
│
├── .gitignore  
├── firebaseconfig.js     
├── firebaseconfig.example.js           
├──package.json              
├──package-lock.json         
├──scraper.js                
│
└── README.md                     # Este arquivo
```

---

## ⚠️ Arquivos Necessários para Funcionamento

> Para que o projeto funcione corretamente, os seguintes arquivos devem estar presentes e corretamente configurados:

- `Client/src/services/firebase.js`: Configuração do Firebase client-side (**exemplo disponível como `firebase.example.js`**).
- `Server/firebaseconfig.js`: Configuração de inicialização do Firebase no backend (**exemplo disponível como `firebaseconfig.example.js`**).
- `Server/serviceAccountKey.json`: Chave privada do Firebase Admin (**exemplo disponível como `serviceAccountKey.example.json`** — **nunca suba o original para o repositório!**).

---

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Instale as dependências do frontend e backend:
```bash
npm install # raiz do projeto

cd Client
npm install

cd ../Server
npm install
```

3. Execute a aplicação (Exemplo):
```bash
#Na raiz
node scraper.js
# Em Client
npm run dev

# Em Server
node index.js
```

---

## ✅ Observações
- Certifique-se de proteger o arquivo `serviceAccountKey.json` e nunca subi-lo ao GitHub.
- Os arquivos `.example.js` e `.example.json` devem ser copiados e renomeados com os dados reais na sua conta do Firebase.

---


