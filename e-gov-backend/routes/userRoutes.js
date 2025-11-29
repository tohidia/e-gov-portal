// import express from 'express';
// import {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser
// } from '../controllers/userController.js';

// const router = express.Router();

// // ✅ گرفتن همه کاربران
// router.get('/', getUsers);

// // ✅ گرفتن کاربر خاص بر اساس ID
// router.get('/:id', getUserById);

// // ✅ ایجاد کاربر جدید
// router.post('/', createUser);

// // ✅ ویرایش کاربر
// router.put('/:id', updateUser);

// // ✅ حذف کاربر
// router.delete('/:id', deleteUser);

// export default router;


// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import pool from "../config/db.js";

// const router = express.Router();

// // 🟢 Register user
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, name, email, role",
//       [name, email, hashedPassword, role || "citizen"]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 🟡 Login user
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//     if (result.rows.length === 0) return res.status(401).json({ error: "User not found" });

//     const user = result.rows[0];
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(401).json({ error: "Invalid password" });

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
//     res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;




// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import pool from "../config/db.js";

// const router = express.Router();

// // 🟢 REGISTER USER
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     // 🧩 Validate input
//     if (!name || !email || !password)
//       return res.status(400).json({ error: "All fields are required" });

//     // 📧 Check if email already exists
//     const existingUser = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
//     if (existingUser.rows.length > 0)
//       return res.status(400).json({ error: "Email already registered" });

//     // 🔐 Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 🧍 Create user (default role = 'citizen')
//     const result = await pool.query(
//       `INSERT INTO users (name, email, password, role, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, NOW(), NOW())
//        RETURNING id, name, email, role`,
//       [name, email, hashedPassword, role || "citizen"]
//     );

//     const user = result.rows[0];

//     // 🪙 Create JWT token
//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     res.status(201).json({ token, user });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // 🟡 LOGIN USER
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password)
//       return res.status(400).json({ error: "Email and password required" });

//     // 🔍 Check user
//     const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//     if (result.rows.length === 0)
//       return res.status(401).json({ error: "User not found" });

//     const user = result.rows[0];

//     // 🔑 Verify password
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(401).json({ error: "Invalid password" });

//     // 🪙 Generate JWT token
//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     res.json({
//       token,
//       user: { id: user.id, name: user.name, role: user.role },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;




// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import pool from "../config/db.js";
// import { verifyToken, adminOnly, citizenOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // =====================
// // 🟢 REGISTER USER
// // =====================
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     if (!name || !email || !password)
//       return res.status(400).json({ error: "All fields are required" });

//     const existingUser = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
//     if (existingUser.rows.length > 0)
//       return res.status(400).json({ error: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const result = await pool.query(
//       `INSERT INTO users (name, email, password, role, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, NOW(), NOW())
//        RETURNING id, name, email, role`,
//       [name, email, hashedPassword, role || "citizen"]
//     );

//     const user = result.rows[0];
//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

//     res.status(201).json({ token, user });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // =====================
// // 🟡 LOGIN USER
// // =====================
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password)
//       return res.status(400).json({ error: "Email and password required" });

//     const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//     if (result.rows.length === 0)
//       return res.status(401).json({ error: "User not found" });

//     const user = result.rows[0];
//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(401).json({ error: "Invalid password" });

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

//     res.json({
//       token,
//       user: { id: user.id, name: user.name, role: user.role },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // =====================
// // 🔒 CRUD USERS (Protected)
// // =====================

// // GET all users (admin only)
// router.get("/", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const result = await pool.query("SELECT id, name, email, role FROM users ORDER BY id ASC");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // GET user by ID (admin only)
// router.get("/:id", verifyToken, adminOnly, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("SELECT id, name, email, role FROM users WHERE id=$1", [id]);
//     if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // UPDATE user (admin only)
// router.put("/:id", verifyToken, adminOnly, async (req, res) => {
//   const { id } = req.params;
//   const { name, email, role } = req.body;
//   try {
//     const result = await pool.query(
//       "UPDATE users SET name=$1, email=$2, role=$3, updated_at=NOW() WHERE id=$4 RETURNING id, name, email, role",
//       [name, email, role, id]
//     );
//     if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // DELETE user (admin only)
// router.delete("/:id", verifyToken, adminOnly, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING id", [id]);
//     if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;


// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import pool from "../config/db.js";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

//   const existing = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
//   if (existing.rows.length > 0) return res.status(400).json({ error: "Email exists" });

//   const hashed = await bcrypt.hash(password, 10);
//   const result = await pool.query(
//     "INSERT INTO users (name,email,password,role,created_at,updated_at) VALUES($1,$2,$3,$4,NOW(),NOW()) RETURNING id,name,role",
//     [name, email, hashed, role || "citizen"]
//   );

//   const user = result.rows[0];
//   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
//   res.status(201).json({ token, user });
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//   if (!result.rows.length) return res.status(401).json({ error: "User not found" });

//   const user = result.rows[0];
//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(401).json({ error: "Invalid password" });

//   const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
//   res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
// });

// // Get all users (Admin only)
// router.get("/", verifyToken, adminOnly, async (req, res) => {
//   const result = await pool.query("SELECT id,name,email,role FROM users ORDER BY id ASC");
//   res.json(result.rows);
// });

// export default router;


// userRoutes.js

// import { verifyToken } from "../middleware/authMiddleware.js";

// import express from "express";
// import { registerUser, loginUser, getUsers } from "../controllers/userController.js";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // مسیر ثبت‌نام
// router.post("/register", registerUser);

// // مسیر لاگین
// router.post("/login", loginUser);

// // مسیر گرفتن همه کاربران (Admin)
// router.get("/", verifyToken, adminOnly, getUsers);

// export default router;


// import { verifyToken } from "../middleware/authMiddleware.js";

import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";
import { verifyToken, adminOnly, citizenOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// مسیر ثبت‌نام
router.post("/register", registerUser);

// مسیر لاگین
router.post("/login", loginUser);

// مسیر گرفتن همه کاربران (Admin)
router.get("/", verifyToken, adminOnly, getUsers);

export default router;
