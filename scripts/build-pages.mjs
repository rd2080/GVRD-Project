// Static demo build for GitHub Pages. Synthetic data only, never used for the real app.
// Static export cannot include the Better Auth API route, so it is parked for this build
// and always restored afterwards.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { rename, rm, writeFile } from "node:fs/promises";

const api = "src/app/api";
const parked = ".pages-build-api-parked";

if (existsSync(parked)) {
  console.error(`${parked} exists. A previous build did not restore it. Move it back to ${api} first.`);
  process.exit(1);
}

let status = 1;
// Clear generated types from earlier builds, which still point at the parked route.
await rm(".next", { recursive: true, force: true });
await rename(api, parked);
try {
  const result = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, GITHUB_PAGES: "true", DEMO_MODE: "true" },
  });
  status = result.status ?? 1;
} finally {
  await rename(parked, api);
}

if (status === 0) {
  // GitHub Pages ignores folders starting with an underscore (such as _next) unless this file exists.
  await writeFile("out/.nojekyll", "");
}
process.exit(status);
