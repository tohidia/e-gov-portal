

// // db/models/departments.cjs
// const pkg = require('pg');
// const { Pool } = pkg;

// // ⚡ مشخص کردن کاربر و پسورد مستقیم (override کامل)
// const pool = new Pool({
//   user: 'faiza',
//   password: 'test123',
//   host: '127.0.0.1',
//   port: 5433,
//   database: 'egov_db'
// });

// const Departments = {
//   async createDepartment({ name, code, description }) {
//     const client = await pool.connect();
//     try {
//       console.log('✅ Connected to PostgreSQL database');
//       const result = await client.query(
//         `INSERT INTO departments (name, code, description)
//          VALUES ($1, $2, $3)
//          RETURNING *`,
//         [name, code, description]
//       );
//       return result.rows[0];
//     } catch (err) {
//       console.error('❌ Error:', err.message);
//       throw err;
//     } finally {
//       client.release();
//     }
//   }
// };

// module.exports = Departments;



import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const Departments = {
  async findAll() {
    const res = await pool.query(`SELECT * FROM departments ORDER BY id`);
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query(`SELECT * FROM departments WHERE id = $1`, [id]);
    return res.rows[0];
  },

  async createDepartment({ name, description }) {
    const res = await pool.query(
      `INSERT INTO departments (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [name, description]
    );
    return res.rows[0];
  },
};
