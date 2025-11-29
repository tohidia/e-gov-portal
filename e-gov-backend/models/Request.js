// import pool from '../db.js';
// import pool from '../db.js'; // ✅ حالا کار می‌کنه

// const Request = {
//   getAll: () => pool.query('SELECT * FROM requests'),
//   getById: (id) => pool.query('SELECT * FROM requests WHERE id=$1', [id]),
//   create: (userId, title, description) =>
//     pool.query(
//       'INSERT INTO requests (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
//       [userId, title, description]
//     ),
//   delete: (id) => pool.query('DELETE FROM requests WHERE id=$1', [id]),
// };

// export default Request;


// const pool = require('../db');

// const Request = {
//   getAll: () => pool.query('SELECT * FROM requests'),
//   getById: (id) => pool.query('SELECT * FROM requests WHERE id=$1', [id]),
//   create: (userId, serviceId, status) =>
//     pool.query(
//       'INSERT INTO requests (user_id, service_id, status) VALUES ($1, $2, $3) RETURNING *',
//       [userId, serviceId, status]
//     ),
//   delete: (id) => pool.query('DELETE FROM requests WHERE id=$1', [id]),
// };

// module.exports = Request;




// import pool from '../config/db.js';

// export const Request = {
//   getAll: () =>
//     pool.query(
//       `SELECT r.id, r.user_id, r.service_id, r.status, r.created_at, u.name AS user_name, u.email AS user_email
//        FROM requests r
//        JOIN users u ON r.user_id = u.id`
//     ),
//   getById: (id) =>
//     pool.query('SELECT * FROM requests WHERE id=$1', [id]),
//   create: (userId, serviceId, status) =>
//     pool.query(
//       'INSERT INTO requests (user_id, service_id, status) VALUES ($1,$2,$3) RETURNING *',
//       [userId, serviceId, status]
//     ),
//   delete: (id) => pool.query('DELETE FROM requests WHERE id=$1', [id]),
// };




import pool from '../config/db.js';

export const Request = {
  // گرفتن همه درخواست‌ها با اطلاعات کاربر
  getAll: () =>
    pool.query(
      `SELECT r.id, r.user_id, r.service_id, r.status, r.fee, r.created_at, r.updated_at,
              u.name AS user_name, u.email AS user_email
       FROM requests r
       LEFT JOIN users u ON r.user_id = u.id`
    ),

  // گرفتن یک درخواست با آیدی
  getById: (id) =>
    pool.query('SELECT * FROM requests WHERE id=$1', [id]),

  // ایجاد یک درخواست جدید
  create: (userId, serviceId, status, fee = 0) =>
    pool.query(
      'INSERT INTO requests (user_id, service_id, status, fee) VALUES ($1,$2,$3,$4) RETURNING *',
      [userId, serviceId, status, fee]
    ),

  // حذف یک درخواست
  delete: (id) =>
    pool.query('DELETE FROM requests WHERE id=$1', [id]),

  // آپدیت وضعیت درخواست (Approve / Reject / هر چیز دیگر)
  updateStatus: (id, status) =>
    pool.query(
      'UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
      [status, id]
    ),
};

