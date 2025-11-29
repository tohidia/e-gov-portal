


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import pool from "./config/db.js";

// // 🧭 Routes
// import userRoutes from "./routes/userRoutes.js";
// import departmentRoutes from "./routes/departmentRoutes.js";
// import requestRoutes from "./routes/requestRoutes.js";
// import serviceRoutes from "./routes/serviceRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js"; // ✅ اضافه شد
// // import adminRoutes from "./routes/adminRoutes.js";
// // 🧩 Middleware
// import { verifyToken } from "./middleware/authMiddleware.js";

// dotenv.config();
// const app = express();

// // ⚡ CORS Configuration
// app.use(
//   cors({
//     origin: "http://localhost:5173", // آدرس فرانت‌اند
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // ✅ ترتیب صحیح middleware‌ها
// app.use(cookieParser());
// app.use(express.json());

// // 🧩 تست اتصال به دیتابیس
// pool
//   .connect()
//   .then(() => console.log("✅ PostgreSQL Connected Successfully"))
//   .catch((err) => console.error("❌ Database connection error:", err));

// // 🛣️ تعریف مسیرهای API
// app.use("/api/users", userRoutes);
// app.use("/api/departments", departmentRoutes);
// app.use("/api/requests", requestRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/admin", adminRoutes); // ✅ مسیر جدید ادمین

// // 🔒 مسیر تست احراز هویت
// app.get("/api/protected", verifyToken, (req, res) => {
//   res.json({
//     message: `Hello ${req.user.role}, you are authenticated ✅`,
//     user: req.user,
//   });
// });

// // ⚠️ مدیریت خطای عمومی
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err);
//   res.status(500).json({ error: "Internal server error" });
// });

// // 🚀 Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(`🚀 Backend running on http://localhost:${PORT}`)
// );






import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import pool from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

// -------------------------------------------------------------
// ✅ CORS Configuration (نسخه درست و کامل)
// -------------------------------------------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  })
);

// -------------------------------------------------------------
// Middleware
// -------------------------------------------------------------
app.use(cookieParser());
app.use(express.json());

// -------------------------------------------------------------
// DB Connection Test
// -------------------------------------------------------------
pool
  .connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

// -------------------------------------------------------------
// Routes
// -------------------------------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/admin", adminRoutes); // ALL ADMIN ROUTES AUTOMATICALLY PROTECTED

// -------------------------------------------------------------
// Protected test route
// -------------------------------------------------------------
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.role}, you are authenticated ✅`,
    user: req.user,
  });
});

// -------------------------------------------------------------
// Global Error Handler
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack || err);
  res.status(500).json({ error: "Internal server error" });
});

// -------------------------------------------------------------
// Start Server
// -------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
