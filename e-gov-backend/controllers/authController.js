// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import pool from "../config/db.js";

// const JWT_SECRET = process.env.JWT_SECRET || "mystrongsecretkey123";

// // 🟢 ثبت‌نام کاربر جدید
// export const registerUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     // بررسی تکراری بودن ایمیل
//     const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (existing.rows.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashed = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
//       [name, email, hashed, role || "citizen"]
//     );

//     res.status(201).json({ message: "User registered", user: result.rows[0] });
//   } catch (err) {
//     console.error("Error registering user:", err);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// };

// // 🔑 ورود (Login)
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (user.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const validPass = await bcrypt.compare(password, user.rows[0].password_hash);
//     if (!validPass) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       {
//         id: user.rows[0].id,
//         email: user.rows[0].email,
//         role: user.rows[0].role,
//       },
//       JWT_SECRET,
//       { expiresIn: "7d" }
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
//     console.error("Error logging in:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };


// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import pool from "../config/db.js";

// const JWT_SECRET = process.env.JWT_SECRET || "mystrongsecretkey123";

// // 🟢 Register User
// export const registerUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     // ✅ Check required fields
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ Check if email already exists
//     const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (existing.rows.length > 0) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // ✅ Hash password
//     const hashed = await bcrypt.hash(password, 10);

//     // ✅ Insert new user
//     const result = await pool.query(
//       "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
//       [name, email, hashed, role || "citizen"]
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       user: result.rows[0],
//     });
//   } catch (err) {
//     console.error("❌ Error registering user:", err);
//     res.status(500).json({ message: "Server error during registration" });
//   }
// };

// // 🔑 Login User
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (user.rows.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const validPass = await bcrypt.compare(password, user.rows[0].password_hash);
//     if (!validPass) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       {
//         id: user.rows[0].id,
//         email: user.rows[0].email,
//         role: user.rows[0].role,
//       },
//       JWT_SECRET,
//       { expiresIn: "7d" }
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
//     console.error("❌ Error logging in:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// };




import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "mystrongsecretkey123";

// 🟢 Register User
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email exists
    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, role || "citizen"]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// 🔐 Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Sign JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Success response
    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// 🟡 Get Current User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user.rows[0]);
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
};
