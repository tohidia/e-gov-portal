

// // db/models/users.cjs
// const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// // Get all users (for admin or testing)
// async function findAll() {
//   const res = await pool.query('SELECT id, name, email, role, national_id, dob, created_at FROM users ORDER BY id ASC');
//   return res.rows;
// }

// // Create new user (citizen/officer/admin)
// async function create(user) {
//   const { name, email, password, national_id, dob, phone, role = 'citizen', department_id = null } = user;

//   // Hash password before saving
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const res = await pool.query(
//     `INSERT INTO users (name, email, password_hash, national_id, dob, role, department_id)
//      VALUES ($1, $2, $3, $4, $5, $6, $7)
//      RETURNING id, name, email, role, national_id, dob, created_at`,
//     [name, email, hashedPassword, national_id, dob, role, department_id]
//   );

//   return res.rows[0];
// }

// module.exports = { findAll, create };


import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const Users = {
  async createUser({ name, email, password, role = "citizen" }) {
    const res = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, password, role]
    );
    return res.rows[0];
  },

  async findByEmail(email) {
    const res = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return res.rows[0];
  },

  async findById(id) {
    const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return res.rows[0];
  },

  async findAll() {
    const res = await pool.query(`SELECT id, name, email, role FROM users ORDER BY id DESC`);
    return res.rows;
  },
};
