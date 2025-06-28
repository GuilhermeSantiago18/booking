# 🏢 Sistema de Agendamento de Salas

Sistema completo com backend em **Node.js + Express + Sequelize** e frontend em **Next.js (App Router)**, desenvolvido para gerenciar reservas de salas com autenticação, controle de permissões e logs de atividades.

---

## 📋 Funcionalidades

### 👤 Perfis de usuário

- **Cliente**
  - Criar, visualizar e cancelar agendamentos
  - Ver logs (se tiver permissão)
  - Editar seus dados
- **Administrador**
  - Aprovar ou rejeitar agendamentos
  - Gerenciar clientes (status, permissões)
  - Gerenciar salas
  - Visualizar todos os logs

### 🧹 Módulos do sistema

- Autenticação JWT com cookies
- Agendamentos com status (pendente, aprovado, recusado)
- Gerenciamento de salas com horários e blocos
- Permissões de cliente (agendamento e logs)
- Sistema de logs automático via middleware
- Dashboard com filtros, ordenação e paginação
- Layout responsivo e sidebar dinâmica conforme o perfil

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone git@github.com:GuilhermeSantiago18/booking.git
cd booking
```

---

### 2. Suba o banco de dados com Docker

Dentro da pasta `backend`, execute:

```bash
cd backend
docker-compose up -d
```

Isso irá subir um container MySQL com os seguintes dados:

| Configuração | Valor       |
| ------------ | ----------- |
| Host         | `localhost` |
| Porta        | `3306`      |
| Database     | `booking`   |
| Usuário      | `admin`     |
| Senha        | `admin`     |

---

### 3. Instale as dependências

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 4. Configure variáveis de ambiente

#### Backend - crie o arquivo `.env` na pasta `backend`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=booking
JWT_SECRET=sua_chave_secreta
```

#### Frontend - crie o arquivo `.env` na pasta `frontend`:

```env
NEXT_PUBLIC_API_URL_V1=http://localhost:3001/v1
```

---

### 5. Crie um admin manualmente

Você pode criar diretamente via banco ou usar o endpoint `POST /users` e definir a role como `"admin"`.

---

### 6. Inicie os servidores

```bash
# No backend
cd backend
npm run dev

# Em outro terminal, no frontend
cd frontend
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

---

## 🔐 Autenticação

- JWT armazenado em `httpOnly cookies`
- Middleware de proteção de rotas
- Redirecionamento por role (`admin` ou `client`)

---

## 🧪 Tecnologias utilizadas

- **Frontend:** Next.js, React, TailwindCSS, TypeScript
- **Backend:** Node.js, Express, Sequelize, MySQL, JWT
- **Outros:** Docker, Railway (deploy), monorepo

---

## 📦 Deploy

- Projeto preparado para deploy em Railway (monorepo)
- Docker pronto para produção local

---

## ✅ Melhorias futuras

- Anexos nos agendamentos
- Notificações por e-mail
- Dashboard com gráficos e indicadores

---

