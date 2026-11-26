-- Initial MVP schema. Derived from the product documentation (GVRD documentation.docx).
-- Clinical rules (instrument choice, severity bands, escalation) are NOT encoded here; they await GV's approval.

create table if not exists clinicians (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  full_name   text not null,
  role        text not null check (role in ('gynaecologist', 'psychologist', 'admin')),
  created_at  timestamptz not null default now()
);

create table if not exists patients (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  date_of_birth date,
  created_by    uuid references clinicians(id),
  created_at    timestamptz not null default now()
);

-- Consent is recorded per purpose; revoking sets revoked_at rather than deleting the row.
create table if not exists consents (
  id          uuid primary key default gen_random_uuid(),
  patient_id  uuid not null references patients(id),
  purpose     text not null check (purpose in ('screening', 'share_report_with_psychologist', 'referral')),
  granted_at  timestamptz not null default now(),
  revoked_at  timestamptz
);

-- Raw responses and calculated scores are stored together so scores can be re-derived under a new scoring version.
create table if not exists assessments (
  id               uuid primary key default gen_random_uuid(),
  patient_id       uuid not null references patients(id),
  instrument       text not null check (instrument in ('PHQ-9', 'GAD-7', 'DASS-21')),
  scoring_version  text not null,
  responses        jsonb not null,
  scores           jsonb not null,
  administered_by  uuid references clinicians(id),
  administered_at  timestamptz not null default now()
);

create table if not exists referrals (
  id               uuid primary key default gen_random_uuid(),
  patient_id       uuid not null references patients(id),
  referred_by      uuid not null references clinicians(id),
  psychologist_id  uuid references clinicians(id),
  status           text not null default 'open' check (status in ('open', 'accepted', 'closed')),
  created_at       timestamptz not null default now()
);
