// const pool = require('../db');

// const Users = {
//   getAll: () => pool.query('SELECT * FROM users'),
//   getById: (id) => pool.query('SELECT * FROM users WHERE id=$1', [id]),
//   create: (name, email, password_hash, role) =>
//     pool.query('INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
//                [name, email, password_hash, role]),
//   update: (id, name, email, role) =>
//     pool.query('UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4 RETURNING *', [name, email, role, id]),
//   delete: (id) => pool.query('DELETE FROM users WHERE id=$1', [id]),
// };

// module.exports = Users;


// import pool from '../db.js';

// const Users = {
//   getAll: () => pool.query('SELECT * FROM users'),
//   getById: (id) => pool.query('SELECT * FROM users WHERE id=$1', [id]),
//   create: (name, email, password_hash, role) =>
//     pool.query(
//       'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, email, password_hash, role]
//     ),
//   update: (id, name, email, role) =>
//     pool.query(
//       'UPDATE users SET name=$1, email=$2, role=$3 WHERE id=$4 RETURNING *',
//       [name, email, role, id]
//     ),
//   delete: (id) => pool.query('DELETE FROM users WHERE id=$1', [id]),
// };

// export default Users; // ✅ حالا میشه با import استفاده کرد




// import pool from '../config/db.js';

// export const User = {
//   getAll: () => pool.query('SELECT * FROM users'),
//   getById: (id) => pool.query('SELECT * FROM users WHERE id=$1', [id]),
//   create: (name, email, password_hash, role) =>
//     pool.query(
//       'INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING *',
//       [name, email, password_hash, role]
//     ),
//   delete: (id) => pool.query('DELETE FROM users WHERE id=$1', [id]),
// };
// models/User.js
import pool from "../config/db.js";

export const User = {
  getAll: () => pool.query("SELECT id, name, email, role FROM users"),

  getById: (id) =>
    pool.query("SELECT id, name, email, role FROM users WHERE id=$1", [id]),

  getByEmail: (email) =>
    pool.query("SELECT * FROM users WHERE email=$1", [email]),

  create: (name, email, password, role = "citizen") =>
    pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, password, role]
    ),

  delete: (id) =>
    pool.query("DELETE FROM users WHERE id=$1 RETURNING *", [id]),
};
