# Pet Care — Frontend

Interface web para gestão de cuidados com animais de estimação, construída com React, TypeScript, Vite e TailwindCSS.

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **TailwindCSS** — estilização
- **React Router 6** — roteamento com layouts aninhados

## Estrutura

```
src/
  types/              # Tipagens compartilhadas
  services/           # Chamadas à API (fetch)
  hooks/              # Hooks customizados (useAnimals)
  components/
    landing/          # Seções da landing page
    app/              # Componentes do dashboard (Sidebar)
    AnimalForm.tsx    # Formulário reutilizável de cadastro/edição
    AnimalCard.tsx    # Card de exibição de animal
  pages/
    LandingPage.tsx   # Página inicial pública
    AppLayout.tsx     # Layout do app (Sidebar + Outlet)
    DashboardPage.tsx # Dashboard com stats e animais recentes
    AnimalsPage.tsx   # CRUD de animais
    PlaceholderPage.tsx # Páginas de features futuras
```

## Rotas

| Rota | Página |
|------|--------|
| `/` | Landing page |
| `/app` | Dashboard |
| `/app/animals` | Gestão de animais |
| `/app/vaccines` | Vacinas (em breve) |
| `/app/vet-visits` | Consultas (em breve) |
| `/app/feeding` | Alimentação (em breve) |
| `/app/reminders` | Lembretes (em breve) |

## Pré-requisitos

- Node.js 18+
- Backend rodando em `http://localhost:3333`

## Como rodar

```bash
# Instalar dependências (na raiz do monorepo)
npm install

# Subir o dev server
npm run dev:frontend
```

O app sobe em `http://localhost:5173` com proxy automático para a API.
