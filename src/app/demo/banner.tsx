// Shown at the top of every demo screen so nobody mistakes it for a live or approved screen.
export function DemoBanner({ screenId, version }: { screenId: string; version: string }) {
  return (
    <div className="bg-amber-100 px-6 py-2 text-sm text-amber-900">
      <strong>DEMO</strong> · synthetic data only · Screen {screenId} {version} · not approved
    </div>
  );
}

export function NotAvailable() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Not available</h1>
      <p className="mt-4 text-zinc-600">This page is not available in this environment.</p>
    </main>
  );
}
