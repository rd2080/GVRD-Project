import { Pool } from "pg";

// One pool per server process. Next.js dev reloads modules, so reuse it on globalThis.
const globalForDb = globalThis as unknown as { pool?: Pool };

export const pool =
  globalForDb.pool ??
  new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;
