# ADR-004: Disable cacheComponents and partialPrefetching for MVP

- **Status:** Accepted (2026-11-26)
- **Owner:** RD
- **Related:** G-20

## Context

The scaffold enabled two Next.js features, `cacheComponents` and `partialPrefetching`. Both change how pages are cached and prefetched. Pages showing patient data must never be served from a cache shared between users, and the MVP does not need these features yet.

## Decision

Remove both flags from `next.config.ts`.

## Consequences

- Pages are rendered on request unless they are explicitly static. Pages that show patient data must stay dynamic and must not rely on a shared cache.
- Revisit when there is a measured performance need. Record that decision as a new ADR.
