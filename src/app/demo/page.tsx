import Link from "next/link";
import { isDemoMode } from "@/lib/demo/mode";
import { listDemoPatients } from "@/lib/demo/fixtures";
import { DemoBanner, NotAvailable } from "./banner";

// Index of demo screens for review. Reviewer notes live here, not on the patient-facing screens.
export default function DemoIndex() {
  if (!isDemoMode()) return <NotAvailable />;

  return (
    <>
      <DemoBanner screenId="index" version="" />
      <main className="mx-auto max-w-2xl px-6 py-10 text-stone-900">
        <h1 className="font-serif text-3xl">Demo screens</h1>
        <p className="mt-2 text-stone-700">Synthetic data only. Each screen is waiting for GV approval.</p>

        <section aria-labelledby="screen-c01" className="mt-8 border-l-4 border-l-stone-300 bg-white p-5">
          <h2 id="screen-c01" className="text-lg font-medium">
            C-01 Consent
          </h2>
          <p className="mt-1 text-sm text-stone-700">Version v0.1 · Waiting for GV review</p>
          <p className="mt-4 text-sm font-medium">Open with an example patient</p>
          <ul className="mt-2 space-y-2">
            {listDemoPatients().map((p) => (
              <li key={p.id}>
                <Link
                  className="text-[#0f5e5a] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f5e5a]"
                  href={`/patients/${p.id}/consent`}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="notes-heading" className="mt-8 border border-dashed border-stone-500 p-5 text-sm text-stone-800">
          <h2 id="notes-heading" className="font-medium">
            Reviewer notes for GV (C-01, demo only)
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Who uses this screen? The clinician records what the patient says, and the wording is read aloud to the patient. Confirm.</li>
            <li>Withdrawing screening withdraws sharing with a psychologist too. The demo does this, with a history entry. Confirm.</li>
            <li>Sharing needs screening consent first. The demo enforces this.</li>
            <li>What happens to existing records after a patient stops agreeing is pending (G-17).</li>
            <li>The &ldquo;What you should know&rdquo; wording is placeholder until legal review (G-25).</li>
            <li>The safety alert wording must match the pathway GV approves (G-07).</li>
            <li>An approved helpline number must be added beside the emergency guidance (G-08). The demo has none yet.</li>
            <li>A real record is append-only and stored in the database, with the clinician and method captured.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
