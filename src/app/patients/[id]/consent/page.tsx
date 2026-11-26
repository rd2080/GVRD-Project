import { notFound } from "next/navigation";
import { isDemoMode } from "@/lib/demo/mode";
import { getDemoPatient, listDemoPatients } from "@/lib/demo/fixtures";
import { DemoBanner, NotAvailable } from "@/app/demo/banner";
import { ConsentDemo } from "./consent-demo";

// Demo pages are pre-rendered from synthetic fixtures only. The real app must render patient
// pages per request and never cache them (see docs/security-and-access.md).
export function generateStaticParams() {
  return listDemoPatients().map((p) => ({ id: p.id }));
}

export async function generateMetadata() {
  return { title: isDemoMode() ? "Consent (demo) | GVRD" : "Not available | GVRD" };
}

export default async function ConsentPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isDemoMode()) return <NotAvailable />;

  const { id } = await params;
  const patient = getDemoPatient(id);
  if (!patient) notFound();

  return (
    <>
      <DemoBanner screenId="C-01" version="v0.1" />
      <ConsentDemo patient={patient} />
    </>
  );
}
