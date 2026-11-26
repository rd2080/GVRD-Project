# ADR-005: Instrument selection (PHQ-9, GAD-7, EPDS)

- **Status:** Proposed. Requires GV confirmation of PHQ-9 and GAD-7 (G-01).
- **Owner:** GV (clinical), RD (implementation)
- **Related:** G-02, G-03, G-04, G-05, G-06, D-01

## Context

The product doc offered DASS-21 or PHQ-9 + GAD-7 for the depression and anxiety pilot. GV approved EPDS for pregnancy and postpartum screening (D-01). PHQ-9 item 9 asks about thoughts of self-harm, which gives the escalation pathway a concrete trigger. DASS-21 has no equivalent item.

## Proposal

- **Depression and anxiety (general):** PHQ-9 and GAD-7.
- **Pregnancy and postpartum:** EPDS.
- **DASS-21:** not in the MVP, unless GV asks for it (G-02).

## Open items

- GV to confirm PHQ-9 and GAD-7 (G-01).
- Licence terms for each instrument, including commercial use (G-03).
- Interpretation bands for each instrument, approved by GV (G-04).
- Validated Indian-language versions (G-06).
- The EPDS item that asks about self-harm must trigger the same escalation path as PHQ-9 item 9. Confirm the item and its response rule against the official source before implementation.
