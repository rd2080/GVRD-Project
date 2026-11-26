// Synthetic data only. No real patient, clinician or survey data may appear here.

export const CONSENT_PURPOSES = [
  "screening",
  "share_report_with_psychologist",
  "referral",
] as const;
export type ConsentPurpose = (typeof CONSENT_PURPOSES)[number];
export type ConsentState = "not_asked" | "granted" | "revoked";

export type DemoPatient = {
  id: string;
  label: string;
  consents: Record<ConsentPurpose, ConsentState>;
};

const DEMO_PATIENTS: DemoPatient[] = [
  {
    id: "demo-001",
    label: "Synthetic patient A",
    consents: {
      screening: "granted",
      share_report_with_psychologist: "not_asked",
      referral: "not_asked",
    },
  },
  {
    id: "demo-002",
    label: "Synthetic patient B",
    consents: {
      screening: "revoked",
      share_report_with_psychologist: "revoked",
      referral: "not_asked",
    },
  },
  {
    id: "demo-003",
    label: "Synthetic patient C (new, no consents yet)",
    consents: {
      screening: "not_asked",
      share_report_with_psychologist: "not_asked",
      referral: "not_asked",
    },
  },
];

export function getDemoPatient(id: string): DemoPatient | undefined {
  return DEMO_PATIENTS.find((p) => p.id === id);
}

export function listDemoPatients(): DemoPatient[] {
  return DEMO_PATIENTS;
}
