// src/db/check_migrations.cjs

// src/db/check_migrations.cjs

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const knexLib = require("knex");
const knexfile = require("./knexfile.cjs");

dotenv.config({ path: "../../.env" });

const knex = knexLib(knexfile.development);

async function checkMigrations() {
  const migrationsDir = path.resolve("src/db/migrations");

  console.log("📂 Checking migrations in:", migrationsDir);
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith(".cjs"));
  console.log("\n🗂 Found migration files:");
  files.forEach(f => console.log("   •", f));

  const hasTable = await knex.schema.hasTable("knex_migrations");
  if (!hasTable) {
    console.log("\n⚠️ No 'knex_migrations' table found — maybe migrations never ran.");
    await knex.destroy();
    return;
  }

  const applied = await knex("knex_migrations").select("name");
  const appliedNames = applied.map(row => row.name);

  console.log("\n✅ Applied migrations (from database):");
  appliedNames.length
    ? appliedNames.forEach(n => console.log("   •", n))
    : console.log("   (none applied yet)");

  const missing = appliedNames.filter(n => !files.includes(n));
  const pending = files.filter(f => !appliedNames.includes(f));

  if (missing.length) {
    console.log("\n❌ Missing migration files (listed in DB but not in folder):");
    missing.forEach(m => console.log("   •", m));
  }

  if (pending.length) {
    console.log("\n⏳ Pending migrations (files not yet applied):");
    pending.forEach(p => console.log("   •", p));
  }

  console.log("\n✅ Done checking migrations.\n");

  await knex.destroy();
}

checkMigrations().catch(err => {
  console.error("💥 Error checking migrations:", err.message);
  process.exit(1);
});
