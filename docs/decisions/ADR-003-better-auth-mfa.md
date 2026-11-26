# ADR-003: Better Auth with TOTP MFA for clinicians

- **Status:** Accepted (2026-11-26)
- **Owner:** RD
- **Related:** G-19, G-40, G-41, G-42

## Context

Clinicians access health data, so they need strong authentication. Patient access is a separate decision (G-19). Managed providers (for example Clerk) store user records outside our database. Better Auth runs inside the app and stores its tables in our own Postgres, which keeps identity data in the India region.

## Decision

- Use Better Auth with the Postgres adapter.
- Email and password, with TOTP (authenticator app) MFA through the `twoFactor` plugin.
- Public sign-up is disabled (`disableSignUp: true`). Clinician accounts are created by an admin.

## Consequences

- Better Auth owns its tables (`user`, `session`, `account`, `verification`, `twoFactor`). The clinical `clinicians` table is separate and must be linked to Better Auth users before role checks are used (see [data-model.md](../data-model.md)).
- The first admin account needs a defined bootstrap (G-40).
- The Better Auth CLI on npm is older than the library version and marked deprecated (G-42). Migrations were run successfully with it, but must be re-verified.
- MFA is not yet tested end to end (G-41).
