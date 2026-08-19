import { readFile } from 'node:fs/promises';
import { getDb } from '../app/lib/db.js';

const schema = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
const statements = schema
  .split(';')
  .map((statement) => statement.trim())
  .filter(Boolean);

const db = getDb();
try {
  for (const statement of statements) {
    await db.query(statement);
  }
  console.log(`Database schema ready (${statements.length} statements)`);
} finally {
  await db.end();
}
