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
  types/              # Tipagens compartilhadas (Animal, Vaccine, VetVisit, Feeding, Reminder)
  services/           # Chamadas à API (fetch) — animalService, vaccineService, vetVisitService, feedingService, reminderService
  hooks/              # Hooks customizados — useAnimals, useVaccines, useVetVisits, useFeedings, useReminders
  components/
    landing/          # Seções da landing page (Navbar, Hero, Carousel, Categories, Features, CTA, Footer)
    app/              # Componentes do dashboard (Sidebar)
    AnimalForm.tsx    # Formulário reutilizável de cadastro/edição
    AnimalCard.tsx    # Card de exibição de animal
  pages/
    LandingPage.tsx   # Página inicial pública
    AppLayout.tsx     # Layout do app (Sidebar + Outlet)
    DashboardPage.tsx # Dashboard com stats e animais recentes
    AnimalsPage.tsx   # CRUD de animais
    VaccinesPage.tsx  # Listagem de vacinas
    VetVisitsPage.tsx # Histórico de consultas veterinárias
    FeedingsPage.tsx  # Planos nutricionais
    RemindersPage.tsx # Lembretes e tarefas
```

## Funcionalidades

**Landing Page**
- Navbar com navegação
- Hero section com CTA
- Carousel de animais
- Seção de categorias de cuidados
- Features destacadas
- Call-to-action
- Footer com links

**App - Dashboard**
- Cards com estatísticas (Total de animais, Cães, Gatos, Vacinas pendentes)
- Lista de animais recentes
- Sidebar com navegação

**Gestão de Animais**
- Listar todos os animais
- Adicionar novo animal
- Editar informações (nome, espécie, raça, data de nascimento, peso)
- Deletar animal

**Vacinas**
- Historico completo de vacinações
- Data de aplicação e próxima dose
- Veterinário responsável
- Notas adicionais

**Consultas Veterinárias**
- Registro de visitas ao veterinário
- Data, motivo, diagnóstico
- Veterinário responsável
- Custo da consulta

**Alimentação**
- Planos nutricionais por animal
- Tipo de alimento
- Frequência (ex: 2x ao dia)
- Quantidade e horário
- Notas sobre dieta

**Lembretes**
- Criar tarefas e lembretes para animais
- Marcar como concluído
- Visualizar pendentes e completados
- Data de vencimento

## Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Landing Page | Página inicial pública com apresentação |
| `/app` | Dashboard | Visão geral com estatísticas e animais recentes |
| `/app/animals` | Animais | CRUD completo de animais |
| `/app/vaccines` | Vacinas | Historico e gerenciamento de vacinações |
| `/app/vet-visits` | Consultas | Registro de visitas veterinárias |
| `/app/feeding` | Alimentação | Planos nutricionais dos animais |
| `/app/reminders` | Lembretes | Tarefas e lembretes para cuidados |

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
