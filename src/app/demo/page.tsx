import Link from "next/link";
import { isDemoMode } from "@/lib/demo/mode";
import { listDemoPatients } from "@/lib/demo/fixtures";
import { DemoBanner, NotAvailable } from "./banner";

export const dynamic = "force-dynamic";

// Index of demo screens for review. Lists each screen ID, its version, and its synthetic patients.
export default function DemoIndex() {
  if (!isDemoMode()) return <NotAvailable />;

  return (
    <>
      <DemoBanner screenId="index" version="" />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Demo screens</h1>
        <p className="mt-2 text-zinc-600">Synthetic data only. Each screen is pending GV approval.</p>

        <table className="mt-8 w-full text-left text-sm">
          <thead className="border-b text-zinc-500">
            <tr>
              <th className="py-2">Screen</th>
              <th className="py-2">Version</th>
              <th className="py-2">Status</th>
              <th className="py-2">Open with</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b align-top">
              <td className="py-3">C-01 Consent</td>
              <td className="py-3">v0.1</td>
              <td className="py-3">Awaiting GV review</td>
              <td className="py-3">
                <ul className="space-y-1">
                  {listDemoPatients().map((p) => (
                    <li key={p.id}>
                      <Link className="underline" href={`/patients/${p.id}/consent`}>
                        {p.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
