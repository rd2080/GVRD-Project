import Link from "next/link";
import { isDemoMode } from "@/lib/demo/mode";
import { listDemoPatients } from "@/lib/demo/fixtures";
import { DemoBanner, NotAvailable } from "./banner";

export const dynamic = "force-dynamic";

// Index of demo screens for review. Each screen is listed once, with its version and example patients.
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
      </main>
    </>
  );
}
