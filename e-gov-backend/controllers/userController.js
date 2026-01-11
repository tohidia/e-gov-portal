// controllers/userController.js
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "mystrongsecretkey123";

// 🟢 گرفتن همه کاربران (Admin Only)
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// 🟢 ثبت‌نام کاربر جدید
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role || "citizen"]
    );

    const token = jwt.sign(
      { id: result.rows[0].id, role: result.rows[0].role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error registering user" });
  }
};

// 🟢 ورود کاربر
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error logging in" });
  }
};

// 🟢 گرفتن اطلاعات کاربر فعلی (محافظت‌شده)
export const getCurrentUser = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error fetching user" });
  }
};




// // controllers/userController.js
// import pool from "../config/db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// // 🟢 گرفتن همه کاربران (Admin Only)
// export const getUsers = async (req, res) => {
//   try {
//     const result = await pool.query("SELECT id, name, email, role FROM users ORDER BY id ASC");
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Server error fetching users" });
//   }
// };

// // 🟢 ثبت‌نام کاربر جدید (Register)
// export const registerUser = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
//     if (existing.rows.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
//       [name, email, hashedPassword, role || "citizen"]
//     );

//     res.status(201).json({
//       message: "User registered successfully!",
//       user: result.rows[0],
//     });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Server error registering user" });
//   }
// };

// // 🟢 ورود کاربر (Login)
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const user = result.rows[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     res.json({
//       message: "Login successful!",
//       token,
//       user: { id: user.id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Server error logging in" });
//   }
// };
