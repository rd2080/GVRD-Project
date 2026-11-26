"use client";

import { useRef, useState } from "react";
import { CONSENT_PURPOSES, type ConsentPurpose, type DemoPatient } from "@/lib/demo/fixtures";
import {
  ConsentForm,
  PRIMARY,
  PURPOSE,
  SECONDARY,
  STATE_LABEL,
  type Consents,
} from "@/components/consent/consent-form";

const DIALOG_TITLE_ID = "consent-dialog-title";

// Clinician view: the summary on the record, and the same consent form in a dialog.
export function PatientConsent({ patient }: { patient: DemoPatient }) {
  const [consents, setConsents] = useState<Consents>(patient.consents);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
    // Start on the dialog heading, not on a button, so nothing is changed by accident.
    requestAnimationFrame(() => document.getElementById(DIALOG_TITLE_ID)?.focus());
  };

  // Runs for Close, Escape and the backdrop. Returns focus to the button that opened the dialog.
  const onDialogClose = () => openerRef.current?.focus();

  return (
    <>
      <section aria-labelledby="consent-summary-heading" className="mt-6 bg-white p-5">
        <h2 id="consent-summary-heading" className="text-lg font-medium">
          Consent
        </h2>
        <dl className="mt-3 space-y-2 text-sm">
          {CONSENT_PURPOSES.map((purpose: ConsentPurpose) => (
            <div key={purpose} className="flex justify-between gap-4">
              <dt className="text-stone-800">{PURPOSE[purpose].title}</dt>
              <dd className="font-medium">{STATE_LABEL[consents[purpose]]}</dd>
            </div>
          ))}
        </dl>
        <button ref={openerRef} type="button" className={`${PRIMARY} mt-4`} onClick={openDialog}>
          Review consent with patient
        </button>
      </section>

      <dialog
        ref={dialogRef}
        onClose={onDialogClose}
        aria-labelledby={DIALOG_TITLE_ID}
        className="m-auto w-[min(42rem,calc(100%-2rem))] max-h-[90vh] overflow-y-auto bg-[#faf8f5] p-0 text-stone-900 shadow-xl backdrop:bg-stone-900/40"
      >
        <div className="px-6 py-8">
          <div className="flex items-start justify-between gap-4 border-b border-stone-300 pb-5">
            <div>
              <p className="text-sm text-stone-700">Clinical record consent</p>
              <h2 id={DIALOG_TITLE_ID} tabIndex={-1} className="mt-1 font-serif text-3xl focus:outline-none">
                Consent for {patient.label}
              </h2>
            </div>
            <button type="button" className={SECONDARY} onClick={() => dialogRef.current?.close()}>
              Close
            </button>
          </div>
          <div className="mt-6">
            <ConsentForm initial={patient.consents} onChange={setConsents} />
          </div>
        </div>
      </dialog>
    </>
  );
}
