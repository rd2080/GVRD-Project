import { notFound } from "next/navigation";
import { isDemoMode } from "@/lib/demo/mode";
import { getDemoPatient } from "@/lib/demo/fixtures";
import { DemoBanner, NotAvailable } from "@/app/demo/banner";
import { ConsentDemo } from "./consent-demo";

// Rendered per request: this page will show patient data, so it must never be cached.
export const dynamic = "force-dynamic";

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
