import { test } from "node:test";
import assert from "node:assert/strict";
import { INSTRUMENTS, scoreAssessment } from "./instruments.ts";

test("PHQ-9 totals all nine items, range 0–27", () => {
  assert.equal(scoreAssessment("PHQ-9", Array(9).fill(0)).total, 0);
  assert.equal(scoreAssessment("PHQ-9", Array(9).fill(3)).total, 27);
  assert.equal(scoreAssessment("PHQ-9", [1, 2, 3, 0, 0, 0, 0, 0, 1]).total, 7);
});

test("GAD-7 totals all seven items, range 0–21", () => {
  assert.equal(scoreAssessment("GAD-7", Array(7).fill(3)).total, 21);
});

test("DASS-21 doubles each subscale and reports no single total", () => {
  const responses = Array(21).fill(0);
  responses[2] = 3; // item 3 belongs to Depression
  const result = scoreAssessment("DASS-21", responses);
  const depression = result.scales.find((s) => s.id === "depression");
  assert.deepEqual(depression, { id: "depression", raw: 3, score: 6 });
  assert.equal(result.total, undefined);
});

test("DASS-21 item mapping covers items 1–21 exactly once", () => {
  const items = INSTRUMENTS["DASS-21"].scales.flatMap((s) => s.items).sort((a, b) => a - b);
  assert.deepEqual(items, Array.from({ length: 21 }, (_, i) => i + 1));
});

test("rejects wrong item counts and out-of-range values", () => {
  assert.throws(() => scoreAssessment("PHQ-9", Array(8).fill(0)), /expects 9/);
  assert.throws(() => scoreAssessment("GAD-7", [0, 0, 0, 0, 0, 0, 4]), /integer 0–3/);
  assert.throws(() => scoreAssessment("GAD-7", [0, 0, 0, 0, 0, 0, 1.5]), /integer 0–3/);
});
