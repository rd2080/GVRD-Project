# ADR-001: Next.js with TypeScript and PostgreSQL

- **Status:** Accepted (2026-11-26)
- **Owner:** RD

## Context

The product needs a web UI for clinicians and patients, server-side scoring and access checks, and relational data (patients, consents, assessments, referrals) with strict integrity. The team asked for Next.js and Postgres.

## Decision

Use Next.js (App Router) with TypeScript for the app and API, and PostgreSQL for all data. Use the `pg` driver directly for now, with plain SQL in `db/schema.sql`.

## Consequences

- Schema changes are plain SQL. A numbered migration policy is needed before the schema grows (see [setup.md](../setup.md)).
- No ORM yet. Revisit if query volume or type safety becomes a problem.
- The Next.js version's bundled docs in `node_modules/next/dist/docs/` are the reference for APIs, per `AGENTS.md`.
