// scripts/create_services_table.js
import { Client } from "pg";

async function run() {
  const client = new Client({
    host: "localhost",
    port: 5433,
    database: "egov_db",       // دیتابیس خودت
    user: "postgres",          // یوزر دیتابیس
    password: "your_password_here"  // پسورد دیتابیس
  });

  await client.connect();

  const sql = `
  CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    department_id INTEGER,
    fee NUMERIC(10,2) DEFAULT 0
  );`;

  await client.query(sql);

  // اضافه کردن چند رکورد نمونه
  await client.query(`
    INSERT INTO services (name, description, department_id, fee)
    VALUES 
    ('Passport Renewal', 'Renew your national passport', 1, 50),
    ('Business License', 'Apply for a new business license', 2, 80),
    ('National ID Update', 'Update your National ID information', 1, 0)
    ON CONFLICT DO NOTHING;
  `);

  console.log("✅ services table created and seeded");
  await client.end();
}

run().catch(err => { console.error(err); process.exit(1); });
