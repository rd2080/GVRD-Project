"use client";

import { useState } from "react";
import {
  CONSENT_PURPOSES,
  type ConsentPurpose,
  type ConsentState,
  type DemoPatient,
} from "@/lib/demo/fixtures";

// Wording is placeholder until legal review (G-25) and consent versioning (G-14) are done.
const CONSENT_TEXT_VERSION = "v0.1 (placeholder)";

// Plain language, written to be read aloud to the patient.
const PURPOSE: Record<
  ConsentPurpose,
  { title: string; body: string; keep: string; needsScreening: boolean }
> = {
  screening: {
    title: "Psychological screening",
    body: "We would like you to answer some short questions today, and we will work out your scores. You can say no.",
    keep: "Your answers and your scores.",
    needsScreening: false,
  },
  share_report_with_psychologist: {
    title: "Share your report with a psychologist",
    body: "Allows us to send your screening report to a psychologist, but only if you are referred to one.",
    keep: "Your screening report, shared only with that psychologist.",
    needsScreening: true,
  },
  referral: {
    title: "Referral to a psychologist",
    body: "Allows us to refer you to a psychologist for extra support, and share your contact details with them.",
    keep: "Your referral record and contact details.",
    needsScreening: false,
  },
};

const STATE_LABEL: Record<ConsentState, string> = {
  not_asked: "Not yet asked",
  granted: "Granted",
  refused: "Refused",
  revoked: "Withdrawn",
};

// Left rule colour carries the state too, but the text label always does as well (never colour alone).
const STATE_RULE: Record<ConsentState, string> = {
  not_asked: "border-l-stone-300",
  granted: "border-l-[#0f5e5a]",
  refused: "border-l-stone-500",
  revoked: "border-l-stone-700",
};

const BUTTON_BASE =
  "rounded px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5e5a]";
const PRIMARY = `${BUTTON_BASE} bg-[#0f5e5a] text-white hover:bg-[#0b4a47]`;
const SECONDARY = `${BUTTON_BASE} border border-stone-500 text-stone-900 hover:bg-stone-100`;

const titleId = (purpose: ConsentPurpose) => `purpose-${purpose}`;

export function ConsentDemo({ patient }: { patient: DemoPatient }) {
  const [consents, setConsents] = useState<Record<ConsentPurpose, ConsentState>>(patient.consents);
  const [confirming, setConfirming] = useState<ConsentPurpose | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const record = (purpose: ConsentPurpose, next: ConsentState, event: string) => {
    setConsents((prev) => ({ ...prev, [purpose]: next }));
    setConfirming(null);
    const when = new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
    setHistory((prev) => [
      `${when} · ${PURPOSE[purpose].title}: ${event}. Recorded by Demo clinician (synthetic), in person. Text ${CONSENT_TEXT_VERSION}.`,
      ...prev,
    ]);
    // The buttons that were pressed may disappear, so move focus to the purpose heading instead of the page body.
    requestAnimationFrame(() => document.getElementById(titleId(purpose))?.focus());
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 text-stone-900">
      <header className="border-b border-stone-300 pb-5">
        <p className="text-sm text-stone-700">Clinical record consent</p>
        <h1 className="mt-1 font-serif text-3xl">{patient.label}</h1>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-stone-700">Record number</dt>
          <dd>{patient.recordNumber}</dd>
          <dt className="text-stone-700">Date of birth</dt>
          <dd>{patient.dateOfBirth}</dd>
          <dt className="text-stone-700">Consent text</dt>
          <dd>{CONSENT_TEXT_VERSION}</dd>
        </dl>
      </header>

      <section aria-labelledby="know-heading" className="mt-6 bg-white p-5">
        <h2 id="know-heading" className="text-lg font-medium">
          What you should know
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-800">
          <li>Your scores show how much you are struggling. They are not a diagnosis.</li>
          <li>
            If an answer suggests you may harm yourself, your clinic team will be alerted straight
            away and will act on it.
          </li>
          <li>Only your gynaecologist and the team they choose can see your results.</li>
          <li>How long we keep your information is still being confirmed.</li>
        </ul>
      </section>

      <ul className="mt-8 space-y-5">
        {CONSENT_PURPOSES.map((purpose) => {
          const text = PURPOSE[purpose];
          const state = consents[purpose];
          const blocked = text.needsScreening && consents.screening !== "granted";
          return (
            <li key={purpose} className={`border-l-4 bg-white p-5 ${STATE_RULE[state]}`}>
              <div className="flex items-start justify-between gap-4">
                <h2 id={titleId(purpose)} tabIndex={-1} className="text-lg font-medium focus:outline-none">
                  {text.title}
                </h2>
                <span role="status" className="shrink-0 text-sm font-medium">
                  {STATE_LABEL[state]}
                </span>
              </div>
              <p className="mt-2 text-stone-800">{text.body}</p>
              <p className="mt-2 text-sm text-stone-700">We will keep: {text.keep}</p>

              {blocked && state !== "granted" ? (
                <p className="mt-4 text-sm text-stone-800">Needs screening consent first.</p>
              ) : confirming === purpose ? (
                <div className="mt-4 rounded border border-stone-400 bg-stone-50 p-4 text-sm">
                  <p className="font-medium">Withdraw consent for {text.title.toLowerCase()}?</p>
                  <p className="mt-1 text-stone-800">
                    This stops any future use. What happens to existing records is still to be
                    decided (G-17).
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      autoFocus
                      className={PRIMARY}
                      aria-label={`Confirm withdrawal of consent for ${text.title}`}
                      onClick={() => record(purpose, "revoked", "consent withdrawn")}
                    >
                      Confirm withdrawal
                    </button>
                    <button type="button" className={SECONDARY} onClick={() => setConfirming(null)}>
                      Keep consent
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(state === "not_asked" || state === "refused") && (
                    <>
                      <button
                        type="button"
                        className={PRIMARY}
                        aria-label={`Record consent for ${text.title}`}
                        onClick={() => record(purpose, "granted", "consent recorded")}
                      >
                        Record consent
                      </button>
                      {state === "not_asked" && (
                        <button
                          type="button"
                          className={SECONDARY}
                          aria-label={`Record refusal for ${text.title}`}
                          onClick={() => record(purpose, "refused", "refusal recorded")}
                        >
                          Record refusal
                        </button>
                      )}
                    </>
                  )}
                  {state === "granted" && (
                    <button
                      type="button"
                      className={SECONDARY}
                      aria-label={`Record withdrawal for ${text.title}`}
                      onClick={() => setConfirming(purpose)}
                    >
                      Record withdrawal
                    </button>
                  )}
                  {state === "revoked" && (
                    <button
                      type="button"
                      className={PRIMARY}
                      aria-label={`Record consent again for ${text.title}`}
                      onClick={() => record(purpose, "granted", "consent recorded again")}
                    >
                      Record consent again
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <section aria-labelledby="history-heading" className="mt-10">
        <h2 id="history-heading" className="text-lg font-medium">
          History
        </h2>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-stone-700">No changes made in this session.</p>
        ) : null}
        <ol aria-live="polite" className="mt-2 space-y-2 text-sm">
          {history.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-stone-700">
          Demo only: a real record is append-only and stored in the database.
        </p>
      </section>

      <aside className="mt-10 border border-dashed border-stone-500 p-5 text-sm text-stone-800">
        <p className="font-medium">Reviewer notes for GV (demo only, remove before build)</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Who sees this screen: the clinician, or the patient? The copy is written to be read to the patient.</li>
          <li>Sharing with a psychologist needs screening consent first. The demo enforces this. Withdrawing screening should also withdraw sharing; the demo does not do that yet.</li>
          <li>Withdrawal stops future use. What happens to existing records is pending (G-17).</li>
          <li>The &ldquo;What you should know&rdquo; wording is placeholder until legal review (G-25), and the safety alert wording must match the pathway GV approves (G-07, G-08).</li>
        </ul>
      </aside>
    </main>
  );
}
