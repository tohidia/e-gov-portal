// // // db/models/services.js
// const { Pool } = require('pg');
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// module.exports = {
//   findAll: async () => {
//     const res = await pool.query('SELECT * FROM services');
//     return res.rows;
//   },
//   createService: async (service) => {
//     const { name, department_id, description, fee_amount } = service;
//     const res = await pool.query(
//       `INSERT INTO services (name,department_id,description,fee_amount)
//        VALUES ($1,$2,$3,$4) RETURNING *`,
//       [name, department_id, description, fee_amount]
//     );
//     return res.rows[0];
//   },
// };



import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const Services = {
  async findAll() {
    const res = await pool.query(
      `SELECT s.*, d.name AS department_name
       FROM services s
       LEFT JOIN departments d ON s.department_id = d.id
       ORDER BY s.id`
    );
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query(
      `SELECT s.*, d.name AS department_name
       FROM services s
       LEFT JOIN departments d ON s.department_id = d.id
       WHERE s.id = $1`,
      [id]
    );
    return res.rows[0];
  },
};

