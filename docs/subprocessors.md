# Sub-processors and third parties

Status: Draft. Needed for DPDP Act compliance (G-25) and for clinic due diligence. Review before any pilot.

| Service | What it does | Data it can touch | Location | Status |
|---|---|---|---|---|
| Vercel | Hosts the app and runs server functions | Health data in transit and in logs, if logged | Functions pinned to `bom1` (Mumbai) | In use for functions; project not yet connected |
| PostgreSQL provider | Stores all application data | All application data | India region, to be chosen | Not yet provisioned (G-43) |
| GitHub | Source code and documentation | None, if the no-patient-data rule holds | Outside India | In use |
| Google Drive | Stores the survey workbook copy (G-29) | Research data, including health disclosures | Outside India | Used for research copy; consent not yet confirmed |
| Better Auth (library) | Authentication code that runs in our app | Authentication data, stored in our database | Runs in our app; not a separate service | In use |

## Rules

- A new service that touches personal or health data must be added here before it is used.
- Each sub-processor needs a data processing agreement that covers India.
- Health data must not be sent to any service that is not listed.
- Research data in Google Drive must be removed or moved if consent does not cover it (G-29).
