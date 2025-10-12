// db/models/payments.js
// const db = require('../connection');

// async function createPayment({ request_id, amount, payment_method = 'simulated', status = 'pending', transaction_ref = null }) {
//   const q = `INSERT INTO payments (request_id, amount, payment_method, status, transaction_ref, created_at) VALUES ($1,$2,$3,$4,$5,now()) RETURNING *`;
//   const res = await db.query(q, [request_id, amount, payment_method, status, transaction_ref]);
//   return res.rows[0];
// }

// async function markPaymentSuccess(payment_id, transaction_ref) {
//   const q = `UPDATE payments SET status = 'success', transaction_ref = $1, updated_at = now() WHERE id = $2 RETURNING *`;
//   const res = await db.query(q, [transaction_ref, payment_id]);
//   return res.rows[0];
// }

// async function getPaymentsByRequest(request_id) {
//   const res = await db.query('SELECT * FROM payments WHERE request_id = $1', [request_id]);
//   return res.rows;
// }

// module.exports = { createPayment, markPaymentSuccess, getPaymentsByRequest };



const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

module.exports = {
  createPayment: async (payment) => {
    const { request_id, amount, status } = payment;
    const res = await pool.query(
      `INSERT INTO payments (request_id, amount, status)
       VALUES ($1,$2,$3) RETURNING *`,
      [request_id, amount, status]
    );
    return res.rows[0];
  },
};
