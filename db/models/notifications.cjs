// // models/notifications.js
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

module.exports = {
  createNotification: async (notif) => {
    const { user_id, message } = notif;
    const res = await pool.query(
      `INSERT INTO notifications (user_id,message) VALUES ($1,$2) RETURNING *`,
      [user_id, message]
    );
    return res.rows[0];
  },
  findByUser: async (user_id) => {
    const res = await pool.query(
      `SELECT * FROM notifications WHERE user_id=$1`,
      [user_id]
    );
    return res.rows;
  },
};
