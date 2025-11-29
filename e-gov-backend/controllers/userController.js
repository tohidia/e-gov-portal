// import pool from '../config/db.js';

// // ✅ گرفتن همه کاربران
// export const getUsers = async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Server error fetching users' });
//   }
// };

// // ✅ گرفتن کاربر خاص بر اساس ID
// export const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ ایجاد کاربر جدید
// export const createUser = async (req, res) => {
//   const { name, email, password_hash, role } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, email, password_hash, role]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Server error creating user' });
//   }
// };

// // ✅ ویرایش کاربر
// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { name, email, role } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
//       [name, email, role, id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ message: 'Server error updating user' });
//   }
// };

// // ✅ حذف کاربر
// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Server error deleting user' });
//   }
// };






// controllers/userController.js
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 🟢 گرفتن همه کاربران (Admin Only)
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// 🟢 ثبت‌نام کاربر جدید (Register)
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role || "citizen"]
    );

    res.status(201).json({
      message: "User registered successfully!",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error registering user" });
  }
};

// 🟢 ورود کاربر (Login)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error logging in" });
  }
};
