// models/Request.js

import pool from "../config/db.js";

export const Request = {
  // گرفتن همه درخواست‌ها
  getAll: () =>
    pool.query(
      `SELECT r.*, u.name AS user_name, u.email AS user_email 
       FROM requests r
       LEFT JOIN users u ON r.user_id = u.id
       ORDER BY r.created_at DESC`
    ),

  // گرفتن درخواست کاربر
  getByUser: (userId) =>
    pool.query("SELECT * FROM requests WHERE user_id=$1 ORDER BY created_at DESC", [userId]),

  // گرفتن یک درخواست با آیدی
  getById: (id) =>
    pool.query("SELECT * FROM requests WHERE id=$1", [id]),

  // ایجاد یک درخواست جدید
  create: ({ user_id, service_id, description }) =>
    pool.query(
      `INSERT INTO requests (user_id, service_id, description, status)
       VALUES ($1, $2, $3, 'Pending')
       RETURNING *`,
      [user_id, service_id, description]
    ),

  // حذف یک درخواست
  delete: (id) =>
    pool.query("DELETE FROM requests WHERE id=$1 RETURNING *", [id]),

  // آپدیت وضعیت (Approve / Reject)
  updateStatus: (id, status) =>
    pool.query(
      "UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
      [status, id]
    ),
};


// import pool from '../config/db.js';

// export const Request = {
//   // گرفتن همه درخواست‌ها با اطلاعات کاربر
//   getAll: () =>
//     pool.query(
//       `SELECT r.id, r.user_id, r.service_id, r.status, r.fee, r.created_at, r.updated_at,
//               u.name AS user_name, u.email AS user_email
//        FROM requests r
//        LEFT JOIN users u ON r.user_id = u.id`
//     ),

//   // گرفتن یک درخواست با آیدی
//   getById: (id) =>
//     pool.query('SELECT * FROM requests WHERE id=$1', [id]),

//   // ایجاد یک درخواست جدید
//   create: (userId, serviceId, status, fee = 0) =>
//     pool.query(
//       'INSERT INTO requests (user_id, service_id, status, fee) VALUES ($1,$2,$3,$4) RETURNING *',
//       [userId, serviceId, status, fee]
//     ),

//   // حذف یک درخواست
//   delete: (id) =>
//     pool.query('DELETE FROM requests WHERE id=$1', [id]),

//   // آپدیت وضعیت درخواست (Approve / Reject / هر چیز دیگر)
//   updateStatus: (id, status) =>
//     pool.query(
//       'UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
//       [status, id]
//     ),
// };


