// scripts/run-migrations.js
import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL // یا تنظیمات دیگه در .env
});

async function run() {
  const migrationsDir = path.join(process.cwd(), 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const f of files) {
    const full = path.join(migrationsDir, f);
    console.log('Running', f);
    const sql = fs.readFileSync(full, 'utf8');
    try {
      await pool.query(sql);
      console.log('OK:', f);
    } catch (err) {
      console.error('ERROR running', f, err.message);
      await pool.end();
      process.exit(1);
    }
  }

  await pool.end();
  console.log('All migrations ran successfully.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
