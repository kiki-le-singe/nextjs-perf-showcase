# NestJS API — Next.js Performance Showcase

REST API backend for the [Next.js Performance Showcase](../README.md). Built with NestJS 11, Prisma ORM, and PostgreSQL.

---

## Overview

This server exposes the data endpoints consumed by the Next.js frontend. All responses are validated at runtime with Zod schemas shared via the `@shared` package (`shared/` at the monorepo root).

### Endpoints

| Method | Path              | Description                         |
| ------ | ----------------- | ----------------------------------- |
| GET    | `/api/user`       | Fetch the demo user profile         |
| GET    | `/api/dashboard`  | Fetch dashboard stats and activity  |
| GET    | `/api/products`   | Fetch product catalog               |
| GET    | `/api/blog-posts` | Fetch blog posts                    |

---

## Running the server

**Recommended** — use the root-level script from the monorepo root:

```bash
npm run dev:server
```

This starts the NestJS server in watch mode on `http://localhost:3001`.

**Standalone** (from `server/`):

```bash
npm run start:dev
```

> Environment variables must be configured before running. See the [root README](../README.md#️-environment-configuration) for the required `server/.env` values.

---

## Database

The server uses **Prisma** with **PostgreSQL** (managed via Docker Compose from the monorepo root).

```bash
# Apply migrations (from server/)
npx prisma migrate dev

# Seed the database (from server/)
npx prisma db seed

# Open Prisma Studio (from monorepo root)
npm run db:studio
```

---

## Testing

Run all commands from `server/`:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:cov
```

---

## Quality checks

Run from `server/`:

```bash
# Type-check via NestJS build
npm run build

# Lint without auto-fix
npm run lint:check
```
