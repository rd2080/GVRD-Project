# Environments and deployment

Status: Draft.

## Environments

| Environment | Purpose | Data | Status |
|---|---|---|---|
| Local | Development on a laptop | Synthetic or test data only, in a Docker Postgres | In use |
| Preview | Vercel preview deployments for pull requests | Synthetic data only | Not set up |
| Staging | Pre-pilot testing, with the production configuration | Synthetic data only | Not set up |
| Production | Pilot and later | Real health data, India region only | Not set up (G-43) |

No real patient data may be used outside production. Research data (G-29) must not be copied into non-production environments.

## Vercel project settings

- Framework: Next.js (App Router).
- Region: `bom1`, set in `vercel.json` (ADR-002).
- Environment variables: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. Set them per environment in the Vercel dashboard. Never commit them.
- Production deployments come from the `main` branch only, after review.

## Database

- Production Postgres in an India region (not yet provisioned, G-43).
- Connections must use TLS.
- Backups and point-in-time recovery must be enabled by the provider. The recovery plan is not yet written.

## Migration order

1. Run `db/schema.sql` (idempotent, `npm run db:migrate`).
2. Run the Better Auth migration for the same database.
3. Deploy the application code.

Migrations must run before the code that depends on them. Each schema change needs a note in [data-model.md](data-model.md).

## Release checklist

- [ ] `npm test`, `npm run lint`, `npx tsc --noEmit` and `npm run build` pass.
- [ ] Migrations tested on staging.
- [ ] No secrets in the diff.
- [ ] Data model and scoring spec updated if affected.
- [ ] Tracker updated for any closed gap.

## Rollback

Application code can be rolled back to the previous Vercel deployment. Database changes are not automatically reversible. Write a reverse migration for each schema change before release.
