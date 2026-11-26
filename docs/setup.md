# Setup and runbook

Status: Draft.

## Prerequisites

- Node.js 22 or later (developed on Node 26).
- Docker, or a local PostgreSQL 16 instance, for development.

## First-time setup

```bash
npm install
cp .env.example .env.local     # then fill in the values (see below)
npm run db:migrate             # applies db/schema.sql
```

The Better Auth tables are created by its migration command. Until a numbered migration policy is in place, run it against the same database after changes to `src/lib/auth.ts`.

## Environment variables

| Name | Purpose | Notes |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Must point at an India-region database in production (G-43) |
| `BETTER_AUTH_SECRET` | Signs Better Auth sessions and tokens | Generate with `openssl rand -base64 32`. Never commit it. |
| `BETTER_AUTH_URL` | Public base URL of the app | `http://localhost:3000` in development |

Put real values in `.env.local`. That file is ignored by Git. Never commit `.env*` files except `.env.example`.

## Run the app

```bash
npm run dev       # development server at http://localhost:3000
npm run build     # production build
npm start         # serve the production build
```

## Checks

```bash
npm test          # scoring unit tests (node:test)
npm run lint
npx tsc --noEmit  # type check
```

Run all four before opening a pull request.

## Local database (Docker)

```bash
docker run -d --name gvrd-pg -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=gvrd -p 5432:5432 postgres:16-alpine
export DATABASE_URL=postgres://postgres:dev@localhost:5432/gvrd
```

Local data is for development only. Do not put real patient data in it.

## Known gaps

- No numbered migrations yet (`db/schema.sql` is applied as a whole).
- No first admin bootstrap (G-40).
- No sign-in page yet.
- Clinical logic (bands, escalation) is not implemented, pending GV approval.
