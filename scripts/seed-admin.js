// scripts/seed-admin.js
// import dotenv from 'dotenv';
// import pg from 'pg';
// import bcrypt from 'bcrypt';

// dotenv.config();
// const { Pool } = pg;
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// async function seed() {
//   const name = 'Admin User';
//   const email = 'admin@example.com';
//   const password = 'Admin@123'; // بعداً این را تغییر دهید
//   const role = 'admin';

//   const hash = await bcrypt.hash(password, 10);

//   const q = `
//     INSERT INTO users (name,email,password_hash,role,created_at,updated_at)
//     VALUES ($1,$2,$3,$4,now(),now())
//     ON CONFLICT (email) DO NOTHING
//     RETURNING id;
//   `;

//   const res = await pool.query(q, [name, email, hash, role]);
//   console.log('Inserted admin (or existed):', res.rows);
//   await pool.end();
// }

// seed().catch(err => {
//   console.error(err);
//   process.exit(1);
// });


import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  const name = 'Admin User';
  const email = 'admin@example.com';
  const password = 'Admin@123'; // بعداً تغییر دهید
  const role = 'admin';

  const hash = await bcrypt.hash(password, 10);

  const q = `
    INSERT INTO users (name,email,password_hash,role,created_at,updated_at)
    VALUES ($1,$2,$3,$4,now(),now())
    ON CONFLICT (email) DO NOTHING
    RETURNING id;
  `;

  const res = await pool.query(q, [name, email, hash, role]);
  console.log('Inserted admin (or existed):', res.rows);

  await pool.end();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
