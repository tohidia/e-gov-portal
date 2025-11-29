// // routes/authRoutes.js
// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import pool from "../config/db.js";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// // 📌 Register
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
//       [name, email, hashedPassword, role || "citizen"]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 📌 Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
//     if (user.rows.length === 0)
//       return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.rows[0].password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user.rows[0].id, role: user.rows[0].role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 📌 Get current user
// router.get("/me", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await pool.query("SELECT id, name, email, role FROM users WHERE id=$1", [decoded.id]);
//     res.json(user.rows[0]);
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// export default router;



// // routes/authRoutes.js
// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import pool from "../config/db.js";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// // 📌 Register
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     // بررسی تکراری بودن ایمیل
//     const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // هش کردن رمز عبور
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // درج کاربر جدید
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
//       [name, email, hashedPassword, role || "citizen"]
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: result.rows[0],
//     });
//   } catch (err) {
//     console.error("Error in register:", err);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// });

// // 📌 Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

//     if (user.rows.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user.rows[0].id, role: user.rows[0].role },
//       process.env.JWT_SECRET || "supersecretkey123",
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.rows[0].id,
//         name: user.rows[0].name,
//         role: user.rows[0].role,
//       },
//     });
//   } catch (err) {
//     console.error("Error in login:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// // 📌 Get current user (Protected Route)
// router.get("/me", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey123");
//     const user = await pool.query("SELECT id, name, email, role FROM users WHERE id=$1", [decoded.id]);

//     if (user.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user.rows[0]);
//   } catch (err) {
//     console.error("Error in /me route:", err);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// export default router;





import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js"; // اگر از PostgreSQL استفاده می‌کنی
import dotenv from "dotenv";
import { verifyToken } from "../middleware/authMiddleware.js";

dotenv.config();
const router = express.Router();

// 🟢 REGISTER — ثبت‌نام کاربر جدید
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // چک کن کاربر از قبل وجود نداشته باشد
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0)
      return res.status(400).json({ message: "User already exists" });

    // هش‌کردن پسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // درج در دیتابیس
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    // ساخت توکن JWT
    const token = jwt.sign(
      { id: newUser.rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // 🕒 توکن برای ۱ ساعت معتبر است
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 LOGIN — ورود کاربر
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // پیدا کردن کاربر در دیتابیس
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    // بررسی پسورد
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // ساخت JWT
    const token = jwt.sign(
      { id: user.rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // 🕒 توکن تا ۱ ساعت
    );

    res.json({
      message: "Login successful",
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🟢 GET CURRENT USER — کاربر فعلی (محافظت‌شده)
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.user.id]
    );

    if (user.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(user.rows[0]);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

