"use client";

import { useState } from "react";
import {
  CONSENT_PURPOSES,
  type ConsentPurpose,
  type ConsentState,
  type DemoPatient,
} from "@/lib/demo/fixtures";

// Wording is placeholder until legal review (G-25) and consent versioning (G-14) are done.
const PURPOSE_TEXT: Record<ConsentPurpose, { title: string; body: string; collects: string }> = {
  screening: {
    title: "Psychological screening",
    body: "Complete short questionnaires during this consultation and have the scores calculated.",
    collects: "Answers to the questionnaire and the calculated scores.",
  },
  share_report_with_psychologist: {
    title: "Share the report with a psychologist",
    body: "Let your gynaecologist share your screening report with a psychologist, if you are referred.",
    collects: "The screening report, shared only with the psychologist you are referred to.",
  },
  referral: {
    title: "Referral to a psychologist",
    body: "Let your gynaecologist refer you to a psychologist for further support.",
    collects: "The referral record and the details needed to contact the psychologist.",
  },
};

const STATE_LABEL: Record<ConsentState, string> = {
  not_asked: "Not yet asked",
  granted: "Granted",
  revoked: "Revoked",
};

export function ConsentDemo({ patient }: { patient: DemoPatient }) {
  const [consents, setConsents] = useState<Record<ConsentPurpose, ConsentState>>(patient.consents);

  const set = (purpose: ConsentPurpose, state: ConsentState) =>
    setConsents((prev) => ({ ...prev, [purpose]: state }));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <p className="text-sm text-zinc-500">Patient: {patient.label}</p>
      <h1 className="mt-1 text-2xl font-semibold">Consent</h1>
      <p className="mt-3 text-zinc-600">
        Each purpose is agreed separately. You can change a choice at any time.
      </p>

      <ul className="mt-8 space-y-4">
        {CONSENT_PURPOSES.map((purpose) => {
          const text = PURPOSE_TEXT[purpose];
          const state = consents[purpose];
          return (
            <li key={purpose} className="rounded-lg border border-zinc-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium">{text.title}</h2>
                  <p className="mt-1 text-sm text-zinc-600">{text.body}</p>
                  <p className="mt-2 text-xs text-zinc-500">Collects: {text.collects}</p>
                </div>
                <span className="shrink-0 rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700">
                  {STATE_LABEL[state]}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => set(purpose, "granted")}
                  className="rounded bg-zinc-900 px-3 py-1.5 text-sm text-white"
                >
                  Grant
                </button>
                <button
                  type="button"
                  onClick={() => set(purpose, "revoked")}
                  className="rounded border border-zinc-300 px-3 py-1.5 text-sm"
                >
                  Revoke
                </button>
                <button
                  type="button"
                  onClick={() => set(purpose, "not_asked")}
                  className="rounded px-3 py-1.5 text-sm text-zinc-500"
                >
                  Reset
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="mt-8 rounded-lg bg-zinc-50 p-5 text-sm text-zinc-700">
        <p className="font-medium">For GV to confirm</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Should sharing with a psychologist require screening consent first?</li>
          <li>Revoking stops future use. What happens to existing records is pending (G-17).</li>
          <li>The consent wording above is placeholder text, pending legal review (G-25).</li>
        </ul>
      </aside>
    </main>
  );
}
