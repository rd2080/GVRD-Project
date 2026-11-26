// Synthetic data only. No real patient, clinician or survey data may appear here.

export const CONSENT_PURPOSES = [
  "screening",
  "share_report_with_psychologist",
  "referral",
] as const;
export type ConsentPurpose = (typeof CONSENT_PURPOSES)[number];
// refused: the patient declined at the first ask. revoked: the patient withdrew an earlier consent.
export type ConsentState = "not_asked" | "granted" | "refused" | "revoked";

export type DemoPatient = {
  id: string;
  label: string;
  recordNumber: string;
  dateOfBirth: string;
  consents: Record<ConsentPurpose, ConsentState>;
};

const RAW_PATIENTS: Omit<DemoPatient, "recordNumber" | "dateOfBirth">[] = [
  {
    id: "demo-001",
    label: "Example patient A",
    consents: {
      screening: "granted",
      share_report_with_psychologist: "not_asked",
      referral: "not_asked",
    },
  },
  {
    id: "demo-002",
    label: "Example patient B",
    consents: {
      screening: "revoked",
      share_report_with_psychologist: "revoked",
      referral: "not_asked",
    },
  },
  {
    id: "demo-003",
    label: "Example patient C (new, no consents yet)",
    consents: {
      screening: "not_asked",
      share_report_with_psychologist: "not_asked",
      referral: "not_asked",
    },
  },
];

// Synthetic identifiers, so the screen can show the two identifiers a clinical record needs.
const DEMO_PATIENTS: DemoPatient[] = RAW_PATIENTS.map((p, i) => ({
  ...p,
  recordNumber: `DEMO-${String(i + 1).padStart(4, "0")}`,
  dateOfBirth: ["14 March 1980", "2 September 1985", "21 January 1990"][i % 3],
}));

export function getDemoPatient(id: string): DemoPatient | undefined {
  return DEMO_PATIENTS.find((p) => p.id === id);
}

export function listDemoPatients(): DemoPatient[] {
  return DEMO_PATIENTS;
}
