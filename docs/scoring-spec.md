# Scoring specification

Status: Pending approval. Scoring rules must be verified against each instrument's official source, and interpretation bands must be approved by GV, before any clinical use (product doc sections 5, 6 and 9).

Scoring logic lives in `src/lib/screening/instruments.ts`. Every stored assessment records the `scoring_version` it was scored with. Changing a rule means a new version, and old assessments are re-scored only on purpose.

Current version: `2026-11-draft-1`.

## PHQ-9 (depression)

- 9 items, each answered 0–3. Item numbers are 1-based.
- Single scale: total = sum of items 1–9, range 0–27.
- Item 9 asks about thoughts of self-harm. A response above 0 must trigger the Level 4 pathway (pending G-07, G-08).
- Bands: **pending GV approval (G-04).**

## GAD-7 (anxiety)

- 7 items, each answered 0–3.
- Single scale: total = sum, range 0–21.
- Bands: **pending GV approval (G-04).**

## EPDS (perinatal depression)

- 10 items. Approved for pregnancy and postpartum screening (D-01). Not yet implemented.
- Total range 0–30 (10 items, 0–3 each).
- Item 10 asks about thoughts of harming oneself. Any positive response must trigger the Level 4 pathway (pending G-07, G-08).
- **To verify before implementation:** the official item wording, the response options, which items are scored in reverse, and the cut-off rules. Record the source in this file.
- Bands: **pending GV approval (G-04).**

## DASS-21 (depression, anxiety, stress)

- 21 items, each answered 0–3. Three subscales, 7 items each.
- Subscale score = sum of its 7 items, doubled to compare with DASS-42.
- Item mapping in code: Depression 3, 5, 10, 13, 16, 17, 21; Anxiety 2, 4, 7, 9, 15, 19, 20; Stress 1, 6, 8, 11, 12, 14, 18.
- **Mapping is not yet verified against the official source (G-05).** Do not use until verified.
- DASS-21 has no self-harm item. It is not in the MVP unless GV asks for it (ADR-005, G-02).

## Clinical flags and reports

- Flags are prompts for review, not diagnoses. Reports must say so (product doc section 7).
- Flag rules and report wording are not yet written. They wait for GV (G-04, G-09).

## Testing

- Unit tests check totals, ranges, item counts and the DASS-21 mapping (`src/lib/screening/instruments.test.mts`).
- The tests check internal consistency only. They do not prove clinical correctness. Known-answer test cases from the official sources should be added once the specs are approved.
