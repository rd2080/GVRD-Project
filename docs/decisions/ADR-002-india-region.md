# ADR-002: Host in the Mumbai region (bom1)

- **Status:** Accepted (2026-11-26)
- **Owner:** RD
- **Related:** G-18, G-43, G-25 (DPDP Act)

## Context

The product stores health data of women in India. Clinics and regulators will ask where data is held. The product doc does not set a residency rule, but it is the expected default.

## Decision

Pin the Vercel functions to `bom1` (Mumbai) in `vercel.json`. Provision the PostgreSQL database in an India region as well. The database is not yet provisioned, so the app currently cannot run in production.

## Consequences

- The database region must match. A database elsewhere would move health data out of India.
- Vendors that process data must also be checked (see [subprocessors.md](../subprocessors.md)).
- Legal review of residency requirements is still pending (G-25).
