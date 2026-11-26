import { notFound } from "next/navigation";
import { isDemoMode } from "@/lib/demo/mode";
import { getDemoPatient, listDemoPatients } from "@/lib/demo/fixtures";
import { DemoBanner, NotAvailable } from "@/app/demo/banner";
import { PatientConsent } from "./consent-panel";

// Demo records are pre-rendered from synthetic fixtures only. The real app must render patient
// pages per request and never cache them (see docs/security-and-access.md).
export function generateStaticParams() {
  return listDemoPatients().map((p) => ({ id: p.id }));
}

export async function generateMetadata() {
  return { title: isDemoMode() ? "Patient record (demo) | GVRD" : "Not available | GVRD" };
}

export default async function PatientPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isDemoMode()) return <NotAvailable />;

  const { id } = await params;
  const patient = getDemoPatient(id);
  if (!patient) notFound();

  return (
    <>
      <DemoBanner screenId="C-01" version="v0.1" />
      <main className="mx-auto max-w-2xl px-6 py-10 text-stone-900">
        <header className="border-b border-stone-300 pb-5">
          <p className="text-sm text-stone-700">Patient record</p>
          <h1 className="mt-1 font-serif text-3xl">{patient.label}</h1>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-stone-700">Record number</dt>
            <dd>{patient.recordNumber}</dd>
            <dt className="text-stone-700">Date of birth</dt>
            <dd>{patient.dateOfBirth}</dd>
          </dl>
        </header>
        <PatientConsent patient={patient} />
      </main>
    </>
  );
}
