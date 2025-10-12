

// // db/models/requests.cjs
// const { Pool } = require("pg");

// // PostgreSQL connection pool
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// module.exports = {
//   // Create a new request
//   createRequest: async ({ citizen_id, service_id, note, status = "Submitted" }) => {
//     const res = await pool.query(
//       `INSERT INTO requests (citizen_id, service_id, note, status)
//        VALUES ($1, $2, $3, $4) RETURNING *`,
//       [citizen_id, service_id, note, status]
//     );
//     return res.rows[0];
//   },

//   // Get all requests for a citizen
//   findAllByCitizen: async (citizen_id) => {
//     const res = await pool.query(
//       `SELECT r.*, s.name AS service_name, d.name AS department_name
//        FROM requests r
//        LEFT JOIN services s ON r.service_id = s.id
//        LEFT JOIN departments d ON s.department_id = d.id
//        WHERE r.citizen_id = $1
//        ORDER BY r.created_at DESC`,
//       [citizen_id]
//     );
//     return res.rows;
//   },

//   // Get all requests (admin view)
//   findAll: async () => {
//     const res = await pool.query(
//       `SELECT r.*, u.name AS citizen_name, s.name AS service_name, d.name AS department_name
//        FROM requests r
//        LEFT JOIN users u ON r.citizen_id = u.id
//        LEFT JOIN services s ON r.service_id = s.id
//        LEFT JOIN departments d ON s.department_id = d.id
//        ORDER BY r.created_at DESC`
//     );
//     return res.rows;
//   },

//   // Get a single request by ID
//   findById: async (id) => {
//     const res = await pool.query(
//       `SELECT r.*, u.name AS citizen_name, s.name AS service_name, d.name AS department_name
//        FROM requests r
//        LEFT JOIN users u ON r.citizen_id = u.id
//        LEFT JOIN services s ON r.service_id = s.id
//        LEFT JOIN departments d ON s.department_id = d.id
//        WHERE r.id = $1`,
//       [id]
//     );
//     return res.rows[0];
//   },

//   // Update a request (e.g., status or note)
//   updateRequest: async (id, { status, note }) => {
//     const res = await pool.query(
//       `UPDATE requests
//        SET status = COALESCE($1, status),
//            note = COALESCE($2, note),
//            updated_at = NOW()
//        WHERE id = $3
//        RETURNING *`,
//       [status, note, id]
//     );
//     return res.rows[0];
//   },

//   // Delete a request
//   deleteRequest: async (id) => {
//     await pool.query(`DELETE FROM requests WHERE id = $1`, [id]);
//     return true;
//   },
// };


// import pkg from "pg";
// const { Pool } = pkg;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT),
// });

// export const Requests = {
//   // 🟢 ایجاد درخواست جدید
//   async createRequest({ citizen_id, service_id, note, status = "Submitted" }) {
//     const res = await pool.query(
//       `INSERT INTO requests (citizen_id, service_id, note, status)
//        VALUES ($1, $2, $3, $4) RETURNING *`,
//       [citizen_id, service_id, note, status]
//     );
//     return res.rows[0];
//   },

//   // 🟢 دریافت تمام درخواست‌های یک شهروند
//   async findAllByCitizen(citizen_id) {
//     const res = await pool.query(
//       `SELECT r.*, s.name AS service_name, d.name AS department_name
//        FROM requests r
//        LEFT JOIN services s ON r.service_id = s.id
//        LEFT JOIN departments d ON s.department_id = d.id
//        WHERE r.citizen_id = $1
//        ORDER BY r.created_at DESC`,
//       [citizen_id]
//     );
//     return res.rows;
//   },

//   // 🟢 دریافت همه درخواست‌ها (برای مدیر)
//   async findAll() {
//     const res = await pool.query(
//       `SELECT r.*, u.name AS citizen_name, s.name AS service_name, d.name AS department_name
//        FROM requests r
//        LEFT JOIN users u ON r.citizen_id = u.id
//        LEFT JOIN services s ON r.service_id = s.id
//        LEFT JOIN departments d ON s.department_id = d.id
//        ORDER BY r.created_at DESC`
//     );
//     return res.rows;
//   },
// };



// src/db/models/requests.js
// src/db/models/requests.js
// import pool from "../../../db.js"; // مسیر صحیح ES Module
import pool from "../../src/db.js";
export const Requests = {
  findAllByCitizen: async (citizen_id) => {
    const result = await pool.query(
      `SELECT r.*, s.name AS service_name, d.name AS department_name
       FROM requests r
       JOIN services s ON r.service_id = s.id
       JOIN departments d ON s.department_id = d.id
       WHERE r.citizen_id = $1
       ORDER BY r.created_at DESC`,
      [citizen_id]
    );
    return result.rows;
  },

  createRequest: async ({ citizen_id, service_id, note, status = "Submitted" }) => {
    const result = await pool.query(
      `INSERT INTO requests (citizen_id, service_id, note, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [citizen_id, service_id, note, status]
    );
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await pool.query(`SELECT * FROM requests WHERE id = $1`, [id]);
    return result.rows[0];
  },

  updateStatus: async (id, status) => {
    const result = await pool.query(
      `UPDATE requests SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    return result.rows[0];
  }
};
