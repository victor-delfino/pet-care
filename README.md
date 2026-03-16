# Pet Care Manager

Plataforma de gestão de cuidados com animais de estimação com backend em Node.js/TypeScript e frontend em React/TypeScript.

Projeto construído com foco em arquitetura de software profissional, seguindo arquitetura em camadas com separação clara de responsabilidades (Domain → Application → Infrastructure → Controllers → Routes).

## Funcionalidades Principais

✅ **Gestão de Animais** — Cadastro, edição e exclusão de animais com raça, data de nascimento e peso

✅ **Vacinas** — Histórico completo de vacinações, data de aplicação, próxima dose

✅ **Consultas Veterinárias** — Registro de visitas ao veterinário com diagnóstico e custos

✅ **Alimentação** — Planos nutricionais com frequência, quantidade e horários

✅ **Lembretes** — Sistema de tarefas para cuidados com os animais

✅ **Dashboard** — Visão geral com estatísticas e dados recentes

✅ **Landing Page** — Apresentação moderna da plataforma

## Estrutura do Monorepo

```
pet-care/
  backend/    # API REST — Node.js, TypeScript, Express, Prisma, PostgreSQL
  frontend/   # Interface web — React, TypeScript, Vite, TailwindCSS
```

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Node.js, TypeScript, Express, Prisma |
| Banco de dados | PostgreSQL (Docker) |
| Frontend | React 18, TypeScript, Vite, TailwindCSS, React Router |
| Padrão | Arquitetura em camadas com Dependency Inversion |

## API Endpoints

**Animais**
- `GET /animals` — Listar todos
- `POST /animals` — Criar novo
- `PUT /animals/:id` — Atualizar
- `DELETE /animals/:id` — Deletar

**Vacinas** (`/vaccines`), **Consultas** (`/vet-visits`), **Alimentação** (`/feedings`), **Lembretes** (`/reminders`)
- Suportam os mesmos endpoints acima
- Todos possuem filtro por `animalId` (ex: `GET /vaccines?animalId=xxx`)
- Foreign keys com `ON DELETE CASCADE` — deletar animal remove dados associados

## Como rodar (Development)

### Instalação

```bash
# Instalar todas as dependências do monorepo
npm install
```

### Backend

```bash
cd backend

# Subir PostgreSQL em Docker
docker compose up -d

# Aplicar migrations
npm run prisma:migrate

# Iniciar servidor (port 3333)
npm run dev
```

### Frontend

```bash
cd frontend

# Iniciar dev server (port 5173)
npm run dev
```

O frontend proxeia automaticamente requisições `/animals`, `/vaccines`, etc. para `http://localhost:3333`.

## Documentação

- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)
