import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { pool } from "@/lib/db";

// Clinician accounts only: public sign-up is disabled, and accounts are created by an admin.
// MFA (TOTP) is required for every clinician account via the twoFactor plugin.
export const auth = betterAuth({
  appName: "GVRD",
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  plugins: [twoFactor({ issuer: "GVRD" })],
});
