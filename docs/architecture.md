# Architecture overview

Status: Draft. Source of truth for product scope: the GVRD product documentation (GVRD documentation.docx).

## Purpose

A web application that brings psychological screening into gynaecology consultations. Patients complete validated questionnaires, the app scores them, and a clinician reviews the result before any next step. Scope is the MVP in the product doc, narrowed by the decisions in [decisions/](decisions/).

## Components

| Component | Technology | Where it runs | Role |
|---|---|---|---|
| Web app and API | Next.js (App Router), TypeScript | Vercel, `bom1` (Mumbai) | UI, route handlers, server-side scoring and access checks |
| Database | PostgreSQL | India region (not yet provisioned, see G-43) | All clinical, consent and audit data |
| Authentication | Better Auth, TOTP MFA | Runs inside the app; user data stored in our Postgres | Clinician sign-in and MFA |
| Source control | GitHub (`rd2080/GVRD-Project`) | GitHub | Code and documentation. Must never contain patient data |

## Data flow (planned)

1. A clinician signs in with email, password and a TOTP code.
2. A clinician registers a patient and records consent for each purpose.
3. The patient completes an instrument. The server validates responses, calculates scores using the versioned scoring module, and stores raw responses and scores together.
4. Scores above the escalation threshold create an alert with a named owner (pending GV's approval of the pathway).
5. The clinician reviews the report and decides on next steps. Results are not released to the patient before review (pending G-09).
6. Every read or write of health data is written to the audit log (planned).

## Boundaries and rules

- Clinical logic (bands, escalation, report wording) lives in code only after GV approval. Until then it is configuration or a stub.
- Health data stays in the India-region database. Logs must not contain health data.
- Clinicians are authenticated; patients are not yet (patient access method is open, G-19).
- The app does not diagnose. Reports must say so.

## Not yet decided

- Patient authentication and access method.
- Clinic (tenant) model and isolation (G-11).
- Audit log, alerts and consent versioning (G-12 to G-14).
- Psychologist referral model (G-21, G-22).

See [security-and-access.md](security-and-access.md) and [data-model.md](data-model.md) for detail.
