import { notFound } from "next/navigation";
import { isDemoMode } from "@/lib/demo/mode";
import { getDemoPatient, listDemoPatients } from "@/lib/demo/fixtures";
import { DemoBanner, NotAvailable } from "@/app/demo/banner";
import { ConsentForm } from "@/components/consent/consent-form";

// The patient's own page. It shows no record number, date of birth or clinical summary.
// Demo tokens are the demo patient ids. The real app issues single-use, expiring tokens (docs/pages.md).
export function generateStaticParams() {
  return listDemoPatients().map((p) => ({ token: p.id }));
}

export async function generateMetadata() {
  return { title: isDemoMode() ? "Your consent (demo) | GVRD" : "Not available | GVRD" };
}

export default async function PatientConsentPage({ params }: { params: Promise<{ token: string }> }) {
  if (!isDemoMode()) return <NotAvailable />;

  const { token } = await params;
  const patient = getDemoPatient(token);
  if (!patient) notFound();

  return (
    <>
      <DemoBanner screenId="C-01" version="v0.1" />
      <main className="mx-auto max-w-2xl px-6 py-10 text-stone-900">
        <header className="border-b border-stone-300 pb-5">
          <p className="text-sm text-stone-700">Clinical record consent</p>
          <h1 className="mt-1 font-serif text-3xl">Your consent</h1>
        </header>
        <div className="mt-6">
          <ConsentForm initial={patient.consents} />
        </div>
      </main>
    </>
  );
}
