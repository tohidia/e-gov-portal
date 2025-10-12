
// // routes/auth.js
// import express from "express";
// import bcrypt from "bcrypt";
// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();
// const { Pool } = pg;
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// const router = express.Router();

// /**
//  * REGISTER
//  * Default role = citizen
//  */
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password)
//     return res.status(400).json({ error: "All fields required" });

//   try {
//     const hash = await bcrypt.hash(password, 10);
//     const q = `
//       INSERT INTO users (name,email,password_hash,role,created_at,updated_at)
//       VALUES ($1,$2,$3,'citizen',now(),now())
//       RETURNING id,name,email,role
//     `;
//     const result = await pool.query(q, [name, email, hash]);
//     res.json({ user: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * LOGIN
//  */
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ error: "Email and password required" });

//   try {
//     const q = "SELECT * FROM users WHERE email=$1";
//     const result = await pool.query(q, [email]);
//     const user = result.rows[0];
//     if (!user) return res.status(401).json({ error: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.password_hash);
//     if (!match) return res.status(401).json({ error: "Invalid credentials" });

//     req.session.user = {
//       id: user.id,
//       role: user.role,
//       name: user.name,
//       email: user.email,
//     };

//     res.json({ message: "Login successful", user: req.session.user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * LOGOUT
//  */
// router.post("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.json({ message: "Logged out" });
//   });
// });

// /**
//  * GET PROFILE
//  */
// router.get("/profile", async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ error: "Not logged in" });
//   }

//   try {
//     const q = `
//       SELECT id,name,email,role,national_id,dob,phone,department,job_title
//       FROM users WHERE id=$1
//     `;
//     const result = await pool.query(q, [req.session.user.id]);
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * UPDATE PROFILE
//  */
// router.put("/profile", async (req, res) => {
//   if (!req.session.user) {
//     return res.status(401).json({ error: "Not logged in" });
//   }

//   const { name, national_id, dob, phone, department, job_title } = req.body;

//   try {
//     const q = `
//       UPDATE users SET 
//         name=$1,
//         national_id=$2,
//         dob=$3,
//         phone=$4,
//         department=$5,
//         job_title=$6,
//         updated_at=now()
//       WHERE id=$7
//       RETURNING id,name,email,role,national_id,dob,phone,department,job_title
//     `;
//     const values = [
//       name,
//       national_id,
//       dob,
//       phone,
//       department,
//       job_title,
//       req.session.user.id,
//     ];
//     const result = await pool.query(q, values);
//     res.json({ message: "Profile updated", user: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


// // src/routes/auth.js
// import express from "express";
// import bcrypt from "bcrypt";
// import pg from "pg";
// import dotenv from "dotenv";
// import { requireLogin, requireRole } from "../middleware/auth.js";

// dotenv.config();
// const { Pool } = pg;
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// const router = express.Router();

// /**
//  * REGISTER
//  * Default role = citizen
//  */
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "All fields required" });
//   }

//   try {
//     const hash = await bcrypt.hash(password, 10);
//     const q = `
//       INSERT INTO users (name,email,password_hash,role,created_at,updated_at)
//       VALUES ($1,$2,$3,'citizen',now(),now())
//       RETURNING id,name,email,role
//     `;
//     const result = await pool.query(q, [name, email, hash]);
//     res.json({ user: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: "Registration failed" });
//   }
// });

// /**
//  * LOGIN
//  */
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password required" });
//   }

//   try {
//     const q = "SELECT * FROM users WHERE email=$1";
//     const result = await pool.query(q, [email]);
//     const user = result.rows[0];
//     if (!user) return res.status(401).json({ error: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.password_hash);
//     if (!match) return res.status(401).json({ error: "Invalid credentials" });

//     // store session
//     req.session.user = {
//       id: user.id,
//       role: user.role,
//       name: user.name,
//       email: user.email,
//     };

//     res.json({ message: "Login successful", user: req.session.user });
//   } catch (err) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// /**
//  * LOGOUT
//  */
// router.post("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.json({ message: "Logged out" });
//   });
// });

// /**
//  * GET PROFILE
//  */
// router.get("/profile", requireLogin, async (req, res) => {
//   try {
//     const q = `
//       SELECT id,name,email,role,national_id,dob,phone,department,job_title
//       FROM users WHERE id=$1
//     `;
//     const result = await pool.query(q, [req.session.user.id]);
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch profile" });
//   }
// });

// /**
//  * UPDATE PROFILE
//  */
// router.put("/profile", requireLogin, async (req, res) => {
//   const { name, national_id, dob, phone, department, job_title } = req.body;

//   try {
//     const q = `
//       UPDATE users SET 
//         name=$1,
//         national_id=$2,
//         dob=$3,
//         phone=$4,
//         department=$5,
//         job_title=$6,
//         updated_at=now()
//       WHERE id=$7
//       RETURNING id,name,email,role,national_id,dob,phone,department,job_title
//     `;
//     const values = [
//       name,
//       national_id,
//       dob,
//       phone,
//       department,
//       job_title,
//       req.session.user.id,
//     ];
//     const result = await pool.query(q, values);
//     res.json({ message: "Profile updated", user: result.rows[0] });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update profile" });
//   }
// });

// /**
//  * Example: Only admin can see this route
//  */
// router.get("/admin-only", requireRole("admin"), (req, res) => {
//   res.json({ message: "Welcome Admin!" });
// });

// export default router;




import express from "express";
import bcrypt from "bcrypt";
import pg from "pg";
import dotenv from "dotenv";
import { requireLogin, requireRole } from "../middleware/auth.js";

dotenv.config();
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const router = express.Router();

/**
 * SHOW REGISTER FORM
 */
router.get("/register", (req, res) => {
  res.render("auth/register", { error: null, form: {} });
});

/**
 * REGISTER (POST)
 * Default role = citizen
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.render("auth/register", { error: "All fields required", form: req.body });
  }

  try {
    // Check if email already exists
    const check = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
    if (check.rows.length > 0) {
      return res.render("auth/register", { error: "Email already in use", form: req.body });
    }

    const hash = await bcrypt.hash(password, 10);
    const q = `
      INSERT INTO users (name,email,password_hash,role,created_at,updated_at)
      VALUES ($1,$2,$3,'citizen',now(),now())
      RETURNING id,name,email,role
    `;
    const result = await pool.query(q, [name, email, hash]);
    
    // Save session and redirect
    req.session.user = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      role: result.rows[0].role
    };
    res.redirect("/"); // بعد از ثبت نام به صفحه اصلی
  } catch (err) {
    console.error(err);
    res.render("auth/register", { error: "Registration failed", form: req.body });
  }
});

/**
 * SHOW LOGIN FORM
 */
router.get("/login", (req, res) => {
  res.render("auth/login", { error: null, form: {} });
});

/**
 * LOGIN (POST)
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render("auth/login", { error: "Email and password required", form: { email } });
  }

  try {
    const q = "SELECT * FROM users WHERE email=$1";
    const result = await pool.query(q, [email]);
    const user = result.rows[0];
    if (!user) return res.render("auth/login", { error: "Invalid credentials", form: { email } });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.render("auth/login", { error: "Invalid credentials", form: { email } });

    // store session
    req.session.user = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    res.redirect("/"); // بعد از لاگین به صفحه اصلی
  } catch (err) {
    console.error(err);
    res.render("auth/login", { error: "Login failed", form: { email } });
  }
});

/**
 * LOGOUT
 */
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

/**
 * GET PROFILE
 */
router.get("/profile", requireLogin, async (req, res) => {
  try {
    const q = `
      SELECT id,name,email,role,national_id,dob,phone,department,job_title
      FROM users WHERE id=$1
    `;
    const result = await pool.query(q, [req.session.user.id]);
    res.render("auth/profile", { user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/**
 * UPDATE PROFILE
 */
router.post("/profile", requireLogin, async (req, res) => {
  const { name, national_id, dob, phone, department, job_title } = req.body;

  try {
    const q = `
      UPDATE users SET 
        name=$1,
        national_id=$2,
        dob=$3,
        phone=$4,
        department=$5,
        job_title=$6,
        updated_at=now()
      WHERE id=$7
      RETURNING id,name,email,role,national_id,dob,phone,department,job_title
    `;
    const values = [
      name,
      national_id,
      dob,
      phone,
      department,
      job_title,
      req.session.user.id,
    ];
    const result = await pool.query(q, values);
    req.session.user = { ...req.session.user, ...result.rows[0] };
    res.render("auth/profile", { user: result.rows[0], message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.render("auth/profile", { user: req.session.user, error: "Failed to update profile" });
  }
});

export default router;
