import { test } from "node:test";
import assert from "node:assert/strict";
import { isDemoMode } from "./mode.ts";

test("demo mode is off by default", () => {
  assert.equal(isDemoMode({}), false);
});

test("demo mode is on only when DEMO_MODE is exactly 'true'", () => {
  assert.equal(isDemoMode({ DEMO_MODE: "true" }), true);
  assert.equal(isDemoMode({ DEMO_MODE: "1" }), false);
  assert.equal(isDemoMode({ DEMO_MODE: "TRUE" }), false);
});

test("demo mode is never on in production, even if DEMO_MODE is set", () => {
  assert.equal(isDemoMode({ DEMO_MODE: "true", VERCEL_ENV: "production" }), false);
});

test("demo mode is allowed in preview and development", () => {
  assert.equal(isDemoMode({ DEMO_MODE: "true", VERCEL_ENV: "preview" }), true);
});
