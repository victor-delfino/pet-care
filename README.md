# Pet Care Manager

Plataforma de gestão de cuidados com animais de estimação.

Projeto construído como portfólio com foco em arquitetura de software profissional, seguindo arquitetura em camadas com separação clara de responsabilidades.

## Estrutura do Monorepo

```
pet-care/
  backend/    # API REST — Node.js, TypeScript, Express, Prisma, PostgreSQL
  frontend/   # Interface web — React, TypeScript, Vite, TailwindCSS (em breve)
```

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Node.js, TypeScript, Express |
| ORM | Prisma |
| Banco de dados | PostgreSQL (Docker) |
| Frontend | React, TypeScript, Vite, TailwindCSS |

## Como rodar

```bash
# Instalar todas as dependências do monorepo
npm install

# Backend
cd backend
docker compose up -d
npm run prisma:migrate
npm run dev
```

## Documentação

- [Backend](./backend/README.md)
