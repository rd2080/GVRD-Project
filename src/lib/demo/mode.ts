// Demo mode shows approval screens with synthetic data only. It must never be on in production.
// Production is detected by Vercel's VERCEL_ENV; DEMO_MODE alone is not enough to enable it there.
export function isDemoMode(env: Record<string, string | undefined> = process.env): boolean {
  if (env.VERCEL_ENV === "production") return false;
  return env.DEMO_MODE === "true";
}
