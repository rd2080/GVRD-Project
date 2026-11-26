// Scoring for the screening instruments listed in the product doc (section 9 / 5).
// Totals and item counts come from the doc. The DASS-21 item-to-subscale mapping is from the
// published instrument and must be verified against official documentation before deployment (doc section 5).
// Interpretation bands are intentionally absent: they await GV's approval (doc section 6).

export const SCORING_VERSION = "2026-11-draft-1";

export type Scale = { id: string; name: string; items: number[] }; // items are 1-based
export type Instrument = {
  id: "PHQ-9" | "GAD-7" | "DASS-21";
  name: string;
  itemCount: number;
  scales: Scale[];
  multiplier: number; // DASS-21 subscales are doubled to compare with DASS-42
};

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const INSTRUMENTS: Record<Instrument["id"], Instrument> = {
  "PHQ-9": {
    id: "PHQ-9",
    name: "Patient Health Questionnaire-9",
    itemCount: 9,
    scales: [{ id: "depression", name: "Depression", items: range(1, 9) }],
    multiplier: 1,
  },
  "GAD-7": {
    id: "GAD-7",
    name: "Generalized Anxiety Disorder-7",
    itemCount: 7,
    scales: [{ id: "anxiety", name: "Anxiety", items: range(1, 7) }],
    multiplier: 1,
  },
  "DASS-21": {
    id: "DASS-21",
    name: "Depression Anxiety Stress Scales-21",
    itemCount: 21,
    scales: [
      { id: "depression", name: "Depression", items: [3, 5, 10, 13, 16, 17, 21] },
      { id: "anxiety", name: "Anxiety", items: [2, 4, 7, 9, 15, 19, 20] },
      { id: "stress", name: "Stress", items: [1, 6, 8, 11, 12, 14, 18] },
    ],
    multiplier: 2,
  },
};

export type ScoreResult = {
  instrument: Instrument["id"];
  scoringVersion: string;
  scales: { id: string; raw: number; score: number }[];
  total?: number; // only for single-scale instruments (PHQ-9 0–27, GAD-7 0–21)
};

// responses[i] is the answer to item i+1, each an integer 0–3.
export function scoreAssessment(id: Instrument["id"], responses: readonly number[]): ScoreResult {
  const instrument = INSTRUMENTS[id];
  if (!instrument) throw new Error(`Unknown instrument: ${id}`);
  if (responses.length !== instrument.itemCount) {
    throw new Error(`${id} expects ${instrument.itemCount} responses, got ${responses.length}`);
  }
  responses.forEach((value, index) => {
    if (!Number.isInteger(value) || value < 0 || value > 3) {
      throw new Error(`${id} item ${index + 1} must be an integer 0–3, got ${value}`);
    }
  });

  const scales = instrument.scales.map((scale) => {
    const raw = scale.items.reduce((sum, item) => sum + responses[item - 1], 0);
    return { id: scale.id, raw, score: raw * instrument.multiplier };
  });

  const total = instrument.scales.length === 1 ? scales[0].score : undefined;
  return { instrument: id, scoringVersion: SCORING_VERSION, scales, total };
}
