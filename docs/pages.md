# App pages

Status: Proposed. Owner: RD (structure), GV (clinical flow).

This is the full list of pages the app is expected to have. The **MVP** column shows what the pilot needs. Routes follow the Next.js App Router layout (`src/app/...`). Paths in `[brackets]` are dynamic.

Pages depend on open decisions. Where a page is blocked, the gap ID is listed in the last column.

## 1. Public and sign-in

| Route | Page | Who | MVP | Depends on |
|---|---|---|---|---|
| `/` | Landing. Redirects signed-in clinicians to `/dashboard`, others to `/sign-in` | Everyone | Yes | None |
| `/sign-in` | Email and password sign-in | Clinicians | Yes | G-19 |
| `/sign-in/mfa` | Enter a TOTP code or backup code | Clinicians | Yes | G-41 |
| `/account/mfa` | Set up an authenticator app; show backup codes | Clinicians | Yes | G-41 |
| `/account/password` | Change password | Clinicians | Yes | None |
| `/forgot-password` | Request a password reset | Clinicians | No (post-MVP) | Email provider (not chosen) |
| `/reset-password/[token]` | Set a new password | Clinicians | No (post-MVP) | Email provider |
| `/privacy-notice` | Privacy notice for patients and clinicians | Everyone | Yes | G-25, G-14 |
| `/terms` | Clinician terms of use | Clinicians | Yes | Legal review |

Admins create clinician accounts and reset MFA. There is no self sign-up (ADR-003).

## 2. Clinician workspace

| Route | Page | Who | MVP | Depends on |
|---|---|---|---|---|
| `/dashboard` | Today's patients, reviews waiting, open alerts | Clinicians | Yes | G-13 |
| `/patients` | Patient list and search, limited to the clinic | Clinicians | Yes | G-11 |
| `/patients/new` | Register a patient | Clinicians | Yes | G-11, G-16 |
| `/patients/[id]` | Patient profile: details, consent status, recent assessments | Clinicians | Yes | G-14 |
| `/patients/[id]/history` | Medical, gynaecological and psychological history | Clinicians | Yes | G-10 |
| `/patients/[id]/consent` | Record consent for each purpose, with the text version | Clinicians | Yes | G-14 |
| `/patients/[id]/assessments` | List of assessments for this patient | Clinicians | Yes | None |
| `/patients/[id]/assessments/new` | Start an assessment: PHQ-9, GAD-7 or EPDS | Clinicians | Yes | G-01, D-01 |
| `/patients/[id]/assessments/[assessmentId]` | Scores, flags and status | Clinicians | Yes | G-04 |
| `/patients/[id]/assessments/[assessmentId]/review` | Clinician review; release to patient | Clinicians | Yes | G-09 |
| `/patients/[id]/report` | Printable report, with the "not a diagnosis" statement | Clinicians | Yes | G-04, G-09 |
| `/patients/[id]/referrals` | Create and track referrals for this patient | Clinicians | Yes | G-21, G-23 |
| `/referrals` | All open referrals for the clinic | Clinicians | Yes | G-15 |
| `/alerts` | Alert queue: owner, status, time since raised | Clinicians (owner) | Yes | G-07, G-13 |
| `/alerts/[id]` | Alert detail and actions taken | Clinicians (owner) | Yes | G-07, G-13 |

## 3. Patient questionnaire

Patients do not have accounts yet, so access is through a link the clinician opens, or by handing over the device. The access method is open (G-19). The questionnaire must also work on paper (G-35).

| Route | Page | Who | MVP | Depends on |
|---|---|---|---|---|
| `/assess/[token]` | Questionnaire, one question per screen, with progress | Patients | Yes | G-19, G-35 |
| `/assess/[token]/consent` | Patient consent before answering | Patients | Yes | G-14 |
| `/assess/[token]/done` | Completion screen with a crisis resource and next steps | Patients | Yes | G-08 |
| `/assess/[token]/expired` | Link expired or already used | Patients | Yes | G-15 |

Tokens are single-use and expire. The clinician issues them from `/patients/[id]/assessments/new`.

## 4. Admin

| Route | Page | Who | MVP | Depends on |
|---|---|---|---|---|
| `/admin` | Overview: clinicians, alerts, pending reviews | Admins | Yes | None |
| `/admin/clinicians` | List clinicians; invite; deactivate; reset MFA | Admins | Yes | G-40 |
| `/admin/clinicians/[id]` | One clinician: role, status, sessions | Admins | Yes | G-40 |
| `/admin/clinic` | Clinic profile and settings | Admins | Yes | G-11 |
| `/admin/escalation` | Named reviewers, on-call rota, response times | Admins | Yes | G-07 |
| `/admin/psychologists` | Clinic-maintained list of referral psychologists | Admins | Yes (list only) | G-21, G-22 |
| `/admin/audit-log` | Who accessed or changed what, and when | Admins | Yes | G-12 |
| `/admin/instruments` | Approved instruments, versions and bands (read-only) | Admins | No (post-MVP) | G-04 |

## 5. System pages

| Route | Page | MVP |
|---|---|---|
| `/api/auth/[...all]` | Authentication endpoints (exists) | Yes |
| `/api/health` | Health check for deployment monitoring | Yes |
| `/not-found` | Not found page | Yes |
| `/error` | Generic error page; no details shown | Yes |

## 6. Post-MVP

These are in the product doc's wider scope, or are needed later. Do not build them now.

| Area | Pages | Why later |
|---|---|---|
| Patient portal | Results history, appointment view | Needs patient auth (G-19) and release rules (G-09) |
| Psychologist portal | Referral inbox, shared reports | Needs psychologist onboarding (G-21) and sharing rules (G-23) |
| Psychologist matching | Recommendations, search | Criteria not defined (G-22) |
| Reminders and notifications | Email or SMS to patients and clinicians | Needs a provider and a sub-processor entry |
| Analytics | Clinic dashboards and outcome trends | Needs validated pilot data |
| Billing | Subscription and payment pages | Business model is unvalidated and has a legal question (G-23, G-27) |
| Other languages | Translated versions of every page | Needs validated translations (G-06) |

## Notes

- Keep patient-facing text neutral and free of clinical labels, given the stigma findings (G-36).
- Every page that shows health data must be dynamic, not cached (ADR-004), and must write an audit entry (G-12).
- A page that cannot work yet should show a clear "not available" message rather than fake data.
