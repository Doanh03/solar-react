import { readFile } from 'node:fs/promises';
import pg from 'pg';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not configured');

const schema = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
const statements = schema
  .split(';')
  .map((statement) => statement.trim())
  .filter(Boolean);

const pool = new Pool({ connectionString });
try {
  for (const statement of statements) {
    await pool.query(statement);
  }
  console.log(`Database schema ready (${statements.length} statements)`);
} finally {
  await pool.end();
}
