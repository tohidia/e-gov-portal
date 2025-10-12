// // models/reports.js
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

module.exports = {
  // تعداد درخواست‌ها به تفکیک دپارتمان
  requestsByDepartment: async () => {
    const res = await pool.query(`
      SELECT d.name AS department, COUNT(r.id) AS total_requests
      FROM departments d
      LEFT JOIN services s ON s.department_id = d.id
      LEFT JOIN requests r ON r.service_id = s.id
      GROUP BY d.name
      ORDER BY d.name
    `);
    return res.rows;
  },

  // تعداد Approved و Rejected
  requestsByStatus: async () => {
    const res = await pool.query(`
      SELECT status, COUNT(*) AS total
      FROM requests
      GROUP BY status
    `);
    return res.rows;
  },

  // مجموع مبلغ پرداخت شده
  totalPayments: async () => {
    const res = await pool.query(`
      SELECT SUM(amount) AS total_collected
      FROM payments
      WHERE status = 'success'
    `);
    return res.rows[0].total_collected || 0;
  }
};
