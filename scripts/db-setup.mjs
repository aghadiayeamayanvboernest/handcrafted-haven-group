/**
 * Creates the database schema in Supabase from scripts/schema.sql.
 * Run: npm run db:setup   (reads SUPABASE_DB_URL from .env.local)
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error("Missing SUPABASE_DB_URL in .env.local");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const sql = await readFile(join(here, "schema.sql"), "utf8");

const client = new pg.Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  await client.query(sql);
  const { rows } = await client.query(
    "select table_name from information_schema.tables where table_schema='public' and table_name in ('sellers','products') order by table_name",
  );
  console.log("Schema applied ✓ tables:", rows.map((r) => r.table_name).join(", "));
} catch (err) {
  console.error("Setup failed:", err.message);
  process.exit(2);
} finally {
  await client.end();
}
