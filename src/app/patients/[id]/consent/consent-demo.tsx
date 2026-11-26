"use client";

import { useState } from "react";
import {
  CONSENT_PURPOSES,
  type ConsentPurpose,
  type ConsentState,
  type DemoPatient,
} from "@/lib/demo/fixtures";

// Wording is placeholder until legal review (G-25) and consent versioning (G-14) are done.
const CONSENT_TEXT_VERSION = "v0.1";

// Plain language. This screen is read aloud to the patient, and the clinician records what she says.
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
  granted: "Agreed",
  refused: "Did not agree",
  revoked: "Stopped",
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
const confirmId = (purpose: ConsentPurpose) => `confirm-${purpose}`;

export function ConsentDemo({ patient }: { patient: DemoPatient }) {
  const [consents, setConsents] = useState<Record<ConsentPurpose, ConsentState>>(patient.consents);
  const [confirming, setConfirming] = useState<ConsentPurpose | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const focusId = (id: string) => requestAnimationFrame(() => document.getElementById(id)?.focus());

  const stamp = () => new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

  const logEvent = (purpose: ConsentPurpose, event: string) =>
    `${stamp()} · ${PURPOSE[purpose].title}: ${event}. Recorded by demo clinician, in person. Text ${CONSENT_TEXT_VERSION}.`;

  const record = (purpose: ConsentPurpose, next: ConsentState, event: string) => {
    setConfirming(null);
    // Sharing depends on screening. Withdrawing screening also withdraws any sharing consent, and the history says so.
    const cascade =
      purpose === "screening" && next === "revoked" && consents.share_report_with_psychologist === "granted";
    setConsents((prev) => ({
      ...prev,
      [purpose]: next,
      ...(cascade ? { share_report_with_psychologist: "revoked" as const } : {}),
    }));
    const entries = [logEvent(purpose, event)];
    if (cascade) {
      entries.push(logEvent("share_report_with_psychologist", "stopped because screening was stopped"));
    }
    setHistory((h) => [...entries, ...h]);
    // The pressed buttons may disappear, so move focus to the purpose heading, not the page body.
    focusId(titleId(purpose));
  };

  const startWithdrawal = (purpose: ConsentPurpose) => {
    setConfirming(purpose);
    // Focus the question, not a button, so a stray keypress cannot make the change.
    focusId(confirmId(purpose));
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
          <li>
            If you feel unsafe right now, call your local emergency number or go to the nearest
            emergency department.
          </li>
          <li>Only your gynaecologist and the team they choose can see your results.</li>
          <li>We are still confirming how long we keep your information.</li>
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
                <p className="mt-4 text-sm text-stone-800">You need to agree to screening first.</p>
              ) : confirming === purpose ? (
                <div className="mt-4 rounded border border-stone-400 bg-stone-50 p-4 text-sm">
                  <p id={confirmId(purpose)} tabIndex={-1} className="font-medium focus:outline-none">
                    {`Do you want to stop agreeing to "${text.title}"?`}
                  </p>
                  <p className="mt-1 text-stone-800">
                    We will stop using this from now on. We are still confirming what happens to
                    records you have already given.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      className={PRIMARY}
                      aria-label={`Yes, I want to stop: ${text.title}`}
                      onClick={() => record(purpose, "revoked", "stopped")}
                    >
                      Yes, I want to stop
                    </button>
                    <button
                      type="button"
                      className={SECONDARY}
                      onClick={() => {
                        setConfirming(null);
                        focusId(titleId(purpose));
                      }}
                    >
                      No, keep agreeing
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
                        aria-label={`I agree: ${text.title}`}
                        onClick={() => record(purpose, "granted", "agreed")}
                      >
                        I agree
                      </button>
                      {state === "not_asked" && (
                        <button
                          type="button"
                          className={SECONDARY}
                          aria-label={`I do not agree: ${text.title}`}
                          onClick={() => record(purpose, "refused", "did not agree")}
                        >
                          I do not agree
                        </button>
                      )}
                    </>
                  )}
                  {state === "granted" && (
                    <button
                      type="button"
                      className={SECONDARY}
                      aria-label={`I want to stop: ${text.title}`}
                      onClick={() => startWithdrawal(purpose)}
                    >
                      I want to stop
                    </button>
                  )}
                  {state === "revoked" && (
                    <button
                      type="button"
                      className={PRIMARY}
                      aria-label={`I agree again: ${text.title}`}
                      onClick={() => record(purpose, "granted", "agreed again")}
                    >
                      I agree again
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
      </section>
    </main>
  );
}
