# Demo mode

Status: Draft. Owner: RD.

Demo mode shows screens for GV to review, using synthetic data only. It is how the screen approval gate (G1 in the [development method](development-method.md)) works.

## Rules

- **Synthetic data only.** Demo fixtures live in `src/lib/demo/fixtures.ts`. No real patient, clinician or survey data may be added.
- **Never in production.** `isDemoMode()` returns false when `VERCEL_ENV` is `production`, whatever `DEMO_MODE` says.
- **Every demo screen shows a banner** with its screen ID, version and "not approved" status.
- **Each screen is rendered per request** (`force-dynamic`), like every page that will show patient data (ADR-004).
- **Off by default.** Set `DEMO_MODE=true` locally or in a preview environment. `.env.example` sets it to `false`.

## How to run it

```bash
DEMO_MODE=true npm run dev
```

Then open http://localhost:3000/demo for the index of demo screens.

## Demo screens

| Screen ID | Page | Version | Status |
|---|---|---|---|
| C-01 | Consent: `/patients/[id]/consent` | v0.1 | Awaiting GV review |

Screen IDs match [pages.md](pages.md) where possible.

## Approval record

Approvals are recorded in the Notion dashboard once the Approvals database exists (see the dashboard's Work items). Until then, record each approval here:

| Screen | Version | Approved by | Date | Notes |
|---|---|---|---|---|
| C-01 | v0.1 | Pending | | First demo screen |

## Changing an approved screen

An approved screen is locked. Any change creates a new version (for example v1.1), a new demo screen state, and a new approval.
