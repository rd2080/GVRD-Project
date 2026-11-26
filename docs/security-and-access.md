# Security and access control

Status: Pending approval (legal and GV review of the privacy points). Owner: RD.

## Data classification

| Class | Examples | Handling |
|---|---|---|
| Health data (special) | Screening responses and scores, psychological history, referrals | Encrypted in transit and at rest, access-checked, audited, never logged |
| Personal identifiers | Name, date of birth, email | Access-checked, never logged |
| Authentication data | Password hashes, sessions, TOTP secrets, backup codes | Managed by Better Auth; never logged or exported |
| Operational data | Timestamps, roles, statuses | Standard handling |
| Research data | Survey responses (see G-29) | Treated as health data until consent is confirmed |

## Threats to design against

- **Unauthorised access to health data** by a clinician from another clinic, a stolen session, or a shared device. Mitigations: tenant scoping, MFA, short sessions, audit log.
- **Leak through logs, errors or analytics.** Mitigation: no health data in logs or error messages.
- **Account takeover.** Mitigations: MFA, no public sign-up, rate limiting on sign-in (to add).
- **Misuse of escalation.** Alerts can be ignored or assigned to no one. Mitigation: each alert has a named owner and status (G-13, G-07).
- **Data residency breach.** Health data copied to services outside India. Mitigation: region pinning and the sub-processor register.
- **Secrets leaking into Git.** Mitigation: `.env*` is ignored; only `.env.example` is committed.

## Roles (proposed)

| Action | Gynaecologist | Psychologist | Admin | Patient |
|---|---|---|---|---|
| Create patient | Yes (own clinic) | No | Yes (own clinic) | No |
| Read patient and assessments | Yes, for own patients with consent | Only with consent, after referral | Metadata only | Own data (approach pending, G-19) |
| Run an assessment | Yes | No | No | Complete questionnaire (pending) |
| Release results to patient | Yes, after review (G-09) | No | No | Receives after release |
| Create referral | Yes | No | No | No |
| Accept referral | No | Yes | No | No |
| Manage clinician accounts | No | No | Yes | No |
| View audit log | No | No | Yes (own clinic) | No |

These rules are proposals. Enforcement is not yet built.

## Authentication

- Clinicians: email and password, plus TOTP MFA (ADR-003).
- Public sign-up is disabled.
- Sessions must be revoked on sign-out and on password change.
- Patient authentication is not decided (G-19).

## Data protection duties (to confirm with counsel)

- DPDP Act 2023 obligations for consent, notices, rights and breach notification (G-25).
- A consent record must show which consent text was accepted and when (G-14).
- A retention schedule (G-17) and a breach response runbook (planned).

## Open items

- Clinic isolation model (G-11).
- Audit log (G-12).
- Patient access method (G-19).
- Rate limiting on sign-in (not yet built).
- Penetration test before any pilot with real data (not yet scheduled).
