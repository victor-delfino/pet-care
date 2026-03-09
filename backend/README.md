# Pet Care — Backend

API REST para gestão de cuidados com animais, construída com Node.js, TypeScript, Express e Prisma.

## Stack

- **Node.js** + **TypeScript**
- **Express** — servidor HTTP
- **Prisma** — ORM
- **PostgreSQL** — banco de dados (via Docker)

## Arquitetura

O projeto segue arquitetura em camadas com separação clara de responsabilidades:

```
src/
  config/          # Inicialização do servidor e app Express
  domain/          # Entidades e interfaces (zero dependências externas)
  application/     # Casos de uso — regras de negócio
  infrastructure/  # Prisma client e repositórios concretos
  controllers/     # Handlers HTTP
  routes/          # Definição de endpoints
```

## Pré-requisitos

- Node.js 18+
- Docker

## Como rodar

```bash
# 1. Instalar dependências (rodar na raiz do monorepo)
npm install

# 2. Subir o banco de dados
docker compose up -d

# 3. Rodar a migration
npm run prisma:migrate

# 4. Subir o servidor
npm run dev
```

O servidor sobe em `http://localhost:3333`.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz de `backend/` com base no exemplo abaixo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/petcare?schema=public"
PORT=3333
```

## Endpoints

| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/animals` | Lista todos os animais |
| POST | `/animals` | Cadastra um novo animal |
| PUT | `/animals/:id` | Atualiza um animal |
| DELETE | `/animals/:id` | Remove um animal |

### Exemplo de payload (POST /animals)

```json
{
  "name": "Rex",
  "species": "Dog",
  "breed": "Labrador",
  "birthDate": "2022-01-15T00:00:00.000Z",
  "weight": 30.5
}
```
