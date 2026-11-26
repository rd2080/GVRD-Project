import Link from "next/link";
import { isDemoMode } from "@/lib/demo/mode";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">GVRD Project</h1>
      <p className="mt-4 text-zinc-600">
        Integrated women&apos;s physical and psychological healthcare platform. MVP foundation is in
        progress: patient records, screening scoring, consent, and referrals.
      </p>
      <p className="mt-4 text-sm text-zinc-500">
        Screening interpretation and escalation rules are pending clinical approval, so no results
        are shown here yet.
      </p>
      {isDemoMode() ? (
        <p className="mt-6">
          <Link className="text-[#0f5e5a] underline underline-offset-4" href="/demo">
            Open the clinical screen demo (synthetic data)
          </Link>
        </p>
      ) : null}
    </main>
  );
}
