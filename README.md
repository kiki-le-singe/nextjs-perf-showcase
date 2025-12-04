# Next.js Performance Showcase

A modern Next.js 16 application demonstrating performance optimization techniques with a NestJS backend API, featuring **Cache Components** and advanced rendering strategies.

---

## ⚙️ Environment Configuration

The project requires environment variables in two locations. Create these files with the following content:

### Root `.env` (Frontend)

```env
API_URL=http://localhost:3001/api
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### `server/.env` (Backend)

```env
# NestJS Server
PORT=3001
NODE_ENV=development

# Database Configuration (PostgreSQL on port 5433)
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/nextjs_perf_db?schema=public"

# Docker Compose
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nextjs_perf_db

# pgAdmin (optional - UI for PostgreSQL)
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin
```

**Note**: These are the default values for local development. The `.env` files are gitignored and not included in the repository.

## 🚀 Quick Start

### First Time Setup

```bash
# Clone the repository
git clone [repo]
cd nextjs-perf-showcase

# Install all dependencies and setup database (one command!)
npm run setup

# Start the backend API
npm run dev:server

# Start the Next.js frontend
npm run dev
```

**That's it!** Open:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)
- Prisma Studio: [http://localhost:5556](http://localhost:5556)
- pgAdmin: [http://localhost:5050](http://localhost:5050) (login: admin@admin.com / admin)
- PostgreSQL: localhost:5433 (user: postgres / password: postgres)

### Daily Development

```bash
# Start PostgreSQL (data persists between restarts)
npm run docker:up

# Start backend API (Terminal 1)
npm run dev:server

# Start frontend (Terminal 2)
npm run dev
```

### Database Management

```bash
# View/Edit database with Prisma Studio
npm run db:studio

# Reset database with fresh seed data
npm run docker:reset

# Stop Docker services
npm run docker:down
```

## 📦 Available Scripts

| Script                 | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `npm run setup`        | First time setup: install deps + create DB + seed data |
| `npm run dev`          | Start Next.js development server                       |
| `npm run dev:server`   | Start NestJS API server                                |
| `npm run docker:up`    | Start PostgreSQL only                                  |
| `npm run docker:reset` | Reset database completely (fresh data)                 |
| `npm run db:studio`    | Open Prisma Studio (DB GUI)                            |
| `npm run docker:down`  | Stop all Docker services                               |

## 🏗️ Tech Stack

- **Frontend**: Next.js 16.0.5, React 19.2, Tailwind CSS 4
- **Backend**: NestJS, Prisma ORM, Zod validation, Pino logging
- **Database**: PostgreSQL 16 (Docker)
- **Package Manager**: npm (or use pnpm/yarn equivalents)
- **Features**: Cache Components, SSR/SSG/ISR/CSR, Streaming, Turbopack

This project demonstrates various performance optimization techniques in Next.js.

## Features Demonstrated

### ✅ Code Splitting

- **Dynamic imports** for heavy components (Chart.js, Leaflet, WaveSurfer.js)
- **Lazy loading** with React.lazy and Suspense
- **Bundle optimization** to reduce initial page load

### ✅ Streaming

- **Basic streaming** with skeleton loading states
- **Dashboard streaming** with staggered component loading
- **Nested streaming** with progressive content rendering
- **Multiple loading patterns** (skeleton, spinner, placeholder)

### 🚧 Coming Soon

- And more performance techniques...

<br />

![Streaming](./docs/streaming.gif)

<br />

![Code Splitting](./docs/code-splitting.gif)

<br />

## Audio Attribution

Music by [Tunetank](https://pixabay.com/users/tunetank-50201703/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=349853) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=349853)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
