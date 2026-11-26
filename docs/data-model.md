# Data model and data dictionary

Status: Draft. Must match `db/schema.sql` and the Better Auth tables. Update this file in the same change as any schema change.

Health data flag: **H** = health data (special category, restricted access and logging). **P** = personal identifier. **A** = authentication data. **O** = operational.

## Application tables (`db/schema.sql`)

### clinicians
| Field | Type | Flag | Notes |
|---|---|---|---|
| id | uuid | P | Primary key |
| email | text | P | Unique |
| full_name | text | P | |
| role | text | O | `gynaecologist`, `psychologist` or `admin` |
| created_at | timestamptz | O | |

Not yet linked to Better Auth users (G-11, see ADR-003). Role checks must use the linked identity, not this table alone.

### patients
| Field | Type | Flag | Notes |
|---|---|---|---|
| id | uuid | P | |
| full_name | text | P | |
| date_of_birth | date | P | |
| created_by | uuid → clinicians.id | O | |
| created_at | timestamptz | O | |

### consents
| Field | Type | Flag | Notes |
|---|---|---|---|
| id | uuid | O | |
| patient_id | uuid → patients.id | P | |
| purpose | text | O | `screening`, `share_report_with_psychologist`, `referral` |
| granted_at | timestamptz | O | |
| revoked_at | timestamptz | O | Revoking sets this; rows are not deleted |

Planned: consent text version (G-14).

### assessments
| Field | Type | Flag | Notes |
|---|---|---|---|
| id | uuid | O | |
| patient_id | uuid → patients.id | P | |
| instrument | text | O | `PHQ-9`, `GAD-7` or `DASS-21`. EPDS to be added (D-01) |
| scoring_version | text | O | Version of the scoring rules used |
| responses | jsonb | H | Raw answers |
| scores | jsonb | H | Calculated scores |
| administered_by | uuid → clinicians.id | O | |
| administered_at | timestamptz | O | |

Planned: status and a duplicate-submission key (G-15).

### referrals
| Field | Type | Flag | Notes |
|---|---|---|---|
| id | uuid | O | |
| patient_id | uuid → patients.id | P | |
| referred_by | uuid → clinicians.id | O | |
| psychologist_id | uuid → clinicians.id | O | |
| status | text | O | `open`, `accepted` or `closed` |
| created_at | timestamptz | O | |

## Better Auth tables (created by its migration)

| Table | Fields used | Flag |
|---|---|---|
| user | id, name, email, emailVerified, image, twoFactorEnabled, createdAt, updatedAt | P |
| session | id, token, expiresAt, ipAddress, userAgent, userId | A |
| account | accountId, providerId, userId, password (hashed), tokens, timestamps | A |
| verification | identifier, value, expiresAt | A |
| twoFactor | secret (encrypted by the library), backupCodes, userId, verified | A |

Never log or export these tables.

## Planned tables (not yet built)

- **clinics:** tenant boundary. Every clinical row must belong to one clinic (G-11).
- **audit_log:** who read or changed which health record, and when (G-12).
- **alerts:** escalation alerts with owner, status and timestamps (G-13).

## Retention

Not yet defined (G-17). Until it is, do not treat any data as deletable.
