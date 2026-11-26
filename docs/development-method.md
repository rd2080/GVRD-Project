# Development method

Status: Draft. Owner: RD. Approved by: GV (clinical content and gates).

This describes how we build GVRD: the order of work, who decides what, and when work is allowed to move forward. It applies to everything in this repository and to the Notion dashboard.

## Principles

1. **Clinical content before code.** Questions, wording, flags, and escalation steps are approved by GV before any backend work that depends on them.
2. **Design before backend.** Screens are built first as a demo with synthetic data, approved screen by screen, and only then built out with a real backend.
3. **Approved means locked.** A screen or rule that GV has approved can't change without a new approval and a version number.
4. **Small, visible steps.** Work moves in one-week sprints. Each sprint ends with something GV can see or decide on.
5. **No real health data outside production.** Local, preview and staging environments use synthetic data only (see [environments-and-deployment.md](environments-and-deployment.md)).
6. **Every open question is recorded.** Gaps, risks and decisions go in the tracker (G-xx, D-xx) and are mirrored on the dashboard.

## Roles

| Role | Person | Responsibility |
|---|---|---|
| Technical lead | RD | Architecture, backend, demo build, sprint plan, dashboard upkeep |
| Clinical and psychological lead | GV | Approves clinical content, screen designs for clinical flows, and each gate |
| Legal (external, to be named) | TBD | Reviews privacy, consent, DPDP and device questions (G-24, G-25) |
| Testers | TBD | Patient, clinician and admin testers in user testing |

## Stages

Work moves through these stages. A stage can be skipped only if the gate it leads to is already met.

| Stage | What happens | Output | Exit gate |
|---|---|---|---|
| 1. Discover | Gaps, risks and questions are logged; research is done | Tracker entries, notes | Question has an owner |
| 2. Design | Demo screens are built with synthetic data behind `DEMO_MODE` | Demo screens with IDs from [pages.md](pages.md) | Screen reviewed by RD |
| 3. Approve | GV reviews each screen; user testing is run where needed | Approval log entry with version | **Gate G1** |
| 4. Build | Backend built for approved screens only, on a feature branch | Code, tests, updated docs | Definition of done (below) |
| 5. Verify | Automated tests, clinical known-answer tests, user acceptance | Test results, sign-off | **Gate G2** |
| 6. Release | Staging, then pilot with one clinic | Release notes, runbook | **Gate G3** |

### Gates

- **G0: Clinical content.** Each instrument's items, scoring and bands are approved by GV and checked against the official source (see [scoring-spec.md](scoring-spec.md)). Required before any scoring code is merged.
- **G1: Screen approval.** GV approves each demo screen, with its states and its data fields. Required before the backend for that screen is built.
- **G2: Build verified.** Tests pass, acceptance checks are done, security review is done for the changed area, and docs are updated.
- **G3: Pilot readiness.** All of the following are true: database in India (G-43), sign-in and MFA tested (G-41), audit log working, legal review done (G-25), penetration test done, incident and escalation runbooks in place (G-07).

## Work management

- **Sprints:** one week, planned on a Monday, reviewed on Friday with GV (30 minutes).
- **Backlog:** the Notion dashboard. Every item has a type, status, priority (P0–P3), owner, and whether it needs GV approval.
- **Decisions and gaps:** the tracker sheet is the source of truth. The dashboard links to it.
- **Priorities:** P0 blocks pilot or patient safety. P1 is needed for MVP. P2 improves the MVP. P3 is post-MVP.
- **Statuses:** Backlog → Ready → In design → Waiting for GV → Approved → In build → In review → Done. Blocked can be set from any status, with the blocking ID noted.

## Definition of ready

A work item can start when:
- It has an ID and a single owner.
- Its clinical dependencies are approved, or it is marked as clinical-neutral.
- Its data fields are listed.
- Its acceptance criteria are written in one or two sentences.

## Definition of done

A work item is done when:
- Code (if any) is merged through a pull request, reviewed.
- Tests pass: `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- New or changed tables and fields are in [data-model.md](data-model.md).
- Clinical items are approved by GV and the approval is logged.
- The tracker and dashboard are updated.
- No secrets or health data are in the diff, the logs, or the test fixtures.

## Branches, commits and pull requests

- Work on a feature branch named `feat/<short-name>`, `fix/<short-name>` or `docs/<short-name>`.
- Open a pull request into `main`. Each pull request links to its work item ID.
- Pull requests that change clinical logic (scoring, bands, escalation, report wording) need GV's approval before merge.
- Direct pushes to `main` are not normal practice. The initial scaffold was pushed to `main` as a one-off on 2026-11-26 after review by RD. Future work goes through pull requests.
- Commit messages describe the change in the imperative mood. Include `Co-Authored-By` lines when Claude is used.

## Approval rules

- Each approved screen gets a version number (for example `P-03 v1.0`).
- The approval log (Notion, "Approvals" database) records: screen ID, version, what changed, who approved, date.
- A change after approval creates a new version and needs new approval.
- Approval covers what is shown on the screen: wording, fields, flow, states. It does not cover instrument validity, which is checked separately (G0).

## Testing layers

| Layer | What it checks | Owner |
|---|---|---|
| Unit | Scoring totals, ranges, mappings | RD |
| Known-answer | Scores for worked examples from the official instrument sources, approved by GV | GV reviews, RD implements |
| Integration | Database queries, access rules, audit writes | RD |
| End-to-end | Main flows: consent, assessment, review, escalation | RD |
| User acceptance | Clinicians, patients and admins use the demo or pilot build | GV coordinates |

## Documentation rules

- Each change updates the doc it affects: data model, scoring spec, pages list, security and access, deployment.
- ADRs are written for decisions that change architecture or policy.
- Gaps found while documenting go in the tracker, not only in the doc.

## Meetings

- **Weekly review (30 min, Friday):** the sprint's demo, approvals needed, blocked items, new gaps.
- **Sprint planning (30 min, Monday):** pick items that are ready.
- **Monthly risk review:** open P0 and P1 gaps, legal status, pilot readiness.

## Measures

Shown on the dashboard:
- Items waiting for GV, and how many days they have waited.
- Open P0 and P1 gaps.
- Sprint completion.
- Gates passed.

## Changing this method

Changes to this document are proposed in a pull request and approved by RD and GV. Record the change date at the bottom.

---

Last changed: 2026-11-26 (initial version).
