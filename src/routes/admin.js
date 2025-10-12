// // routes/admin.js
// import express from "express";
// import pool from "../db.js";
// // import { requireRole } from "../utils/roleMiddleware.js";
// import { requireRole } from "../utils/authMiddleware.js";


// const router = express.Router();

// // 📊 Dashboard: نمایش گزارش‌ها
// router.get("/reports", requireRole("admin"), async (req, res) => {
//   const totalRequests = await pool.query("SELECT COUNT(*) FROM requests");
//   const approved = await pool.query("SELECT COUNT(*) FROM requests WHERE status = 'approved'");
//   const rejected = await pool.query("SELECT COUNT(*) FROM requests WHERE status = 'rejected'");
//   const totalPayments = await pool.query("SELECT COALESCE(SUM(fee),0) FROM services s JOIN requests r ON s.id = r.service_id WHERE r.status = 'approved'");

//   res.render("admin-reports", {
//     user: req.session.user,
//     total: totalRequests.rows[0].count,
//     approved: approved.rows[0].count,
//     rejected: rejected.rows[0].count,
//     payments: totalPayments.rows[0].coalesce || 0
//   });
// });

// // 👥 مدیریت کاربران
// router.get("/users", requireRole("admin"), async (req, res) => {
//   const users = await pool.query("SELECT id, name, role FROM users");
//   res.render("admin-users", { user: req.session.user, users: users.rows });
// });

// // 📌 مدیریت سرویس‌ها
// router.get("/services", requireRole("admin"), async (req, res) => {
//   const services = await pool.query("SELECT * FROM services");
//   res.render("admin-services", { user: req.session.user, services: services.rows });
// });

// // 📌 مدیریت دپارتمان‌ها
// router.get("/departments", requireRole("admin"), async (req, res) => {
//   const departments = await pool.query("SELECT * FROM departments");
//   res.render("admin-departments", { user: req.session.user, departments: departments.rows });
// });

// export default router;


// import express from "express";
// import pool from "../db.js";
// import { requireRole } from "../utils/authMiddleware.js";

// const router = express.Router();

// // Admin Reports Route
// router.get("/reports", requireRole("admin"), async (req, res) => {
//   try {
//     // کل درخواست‌ها
//     const totalRequests = await pool.query("SELECT COUNT(*) FROM requests");
//     const approved = await pool.query("SELECT COUNT(*) FROM requests WHERE status='approved'");
//     const rejected = await pool.query("SELECT COUNT(*) FROM requests WHERE status='rejected'");

//     // مجموع پرداخت‌ها
//     const totalPayments = await pool.query(`
//       SELECT COALESCE(SUM(fee),0) AS total
//       FROM services s
//       JOIN requests r ON s.id = r.service_id
//       WHERE r.status='approved'
//     `);

//     // درخواست‌ها بر اساس دپارتمان
//     const requestsPerDept = await pool.query(`
//       SELECT d.name AS department, COUNT(r.id) AS total_requests
//       FROM requests r
//       JOIN services s ON r.service_id = s.id
//       JOIN departments d ON s.department_id = d.id
//       GROUP BY d.name
//       ORDER BY d.name
//     `);

//     // ارسال داده‌ها به EJS و تبدیل به عدد
//     res.render("admin-reports", {
//       user: req.session.user,
//       total: Number(totalRequests.rows[0].count),
//       approved: Number(approved.rows[0].count),
//       rejected: Number(rejected.rows[0].count),
//       payments: Number(totalPayments.rows[0].total),
//       requestsPerDept: requestsPerDept.rows || []
//     });

//   } catch (err) {
//     console.error("Error loading reports:", err);
//     res.status(500).send("Server error");
//   }
// });

// export default router;



// import express from "express";
// import pool from "../db.js";
// import { requireRole } from "../utils/authMiddleware.js";

// const router = express.Router();

// router.get("/reports", requireRole("admin"), async (req, res) => {
//   try {
//     const totalRequests = await pool.query("SELECT COUNT(*) FROM requests");
//     const approved = await pool.query("SELECT COUNT(*) FROM requests WHERE status='approved'");
//     const rejected = await pool.query("SELECT COUNT(*) FROM requests WHERE status='rejected'");
//     const totalPayments = await pool.query(`
//       SELECT COALESCE(SUM(fee),0) AS total
//       FROM services s
//       JOIN requests r ON s.id = r.service_id
//       WHERE r.status='approved'
//     `);
//     const requestsPerDept = await pool.query(`
//       SELECT d.name AS department, COUNT(r.id) AS total_requests
//       FROM requests r
//       JOIN services s ON r.service_id = s.id
//       JOIN departments d ON s.department_id = d.id
//       GROUP BY d.name
//       ORDER BY d.name
//     `);

//     res.render("admin-reports", {
//       user: req.session.user,
//       total: Number(totalRequests.rows[0].count),
//       approved: Number(approved.rows[0].count),
//       rejected: Number(rejected.rows[0].count),
//       payments: Number(totalPayments.rows[0].total),
//       requestsPerDept: requestsPerDept.rows || [] // همیشه آرایه
//     });

//   } catch (err) {
//     console.error("Error loading reports:", err);
//     res.status(500).send("Server error");
//   }
// });

// export default router;


// import express from "express";
// import pool from "../db.js";
// import { requireRole } from "../utils/authMiddleware.js";

// const router = express.Router();

// // Admin Reports Route
// router.get("/reports", requireRole("admin"), async (req, res) => {
//   try {
//     // Total requests
//     const totalRequestsResult = await pool.query("SELECT COUNT(*) AS count FROM requests");
//     const totalRequests = Number(totalRequestsResult.rows[0]?.count || 0);

//     // Approved requests
//     const approvedResult = await pool.query("SELECT COUNT(*) AS count FROM requests WHERE status='approved'");
//     const approved = Number(approvedResult.rows[0]?.count || 0);

//     // Rejected requests
//     const rejectedResult = await pool.query("SELECT COUNT(*) AS count FROM requests WHERE status='rejected'");
//     const rejected = Number(rejectedResult.rows[0]?.count || 0);

//     // Total payments collected
//     const totalPaymentsResult = await pool.query(`
//       SELECT COALESCE(SUM(fee),0) AS total
//       FROM services s
//       JOIN requests r ON s.id = r.service_id
//       WHERE r.status='approved'
//     `);
//     const payments = Number(totalPaymentsResult.rows[0]?.total || 0);

//     // Requests per department
//     const requestsPerDeptResult = await pool.query(`
//       SELECT d.name AS department, COUNT(r.id) AS total_requests
//       FROM requests r
//       JOIN services s ON r.service_id = s.id
//       JOIN departments d ON s.department_id = d.id
//       GROUP BY d.name
//       ORDER BY d.name
//     `);
//     const requestsPerDept = requestsPerDeptResult.rows || [];

//     // Render admin-reports with safe data
//     res.render("admin-reports", {
//       user: req.session.user || null,
//       total,
//       approved,
//       rejected,
//       payments,
//       requestsPerDept
//     });

//   } catch (err) {
//     console.error("Error loading reports:", err);
//     res.status(500).send("Server error");
//   }
// });

// export default router;


// import express from "express";
// import pool from "../db.js";
// import { requireRole } from "../utils/authMiddleware.js";

// const router = express.Router();

// // Admin Reports Route
// router.get("/reports", requireRole("admin"), async (req, res) => {
//   try {
//     // Total requests
//     const totalRequestsResult = await pool.query("SELECT COUNT(*) AS count FROM requests");
//     const total = Number(totalRequestsResult.rows[0]?.count || 0);

//     // Approved requests
//     const approvedResult = await pool.query("SELECT COUNT(*) AS count FROM requests WHERE status='approved'");
//     const approved = Number(approvedResult.rows[0]?.count || 0);

//     // Rejected requests
//     const rejectedResult = await pool.query("SELECT COUNT(*) AS count FROM requests WHERE status='rejected'");
//     const rejected = Number(rejectedResult.rows[0]?.count || 0);

//     // Total payments collected
//     const totalPaymentsResult = await pool.query(`
//       SELECT COALESCE(SUM(fee),0) AS total
//       FROM services s
//       JOIN requests r ON s.id = r.service_id
//       WHERE r.status='approved'
//     `);
//     const payments = Number(totalPaymentsResult.rows[0]?.total || 0);

//     // Requests per department
//     const requestsPerDeptResult = await pool.query(`
//       SELECT d.name AS department, COUNT(r.id) AS total_requests
//       FROM requests r
//       JOIN services s ON r.service_id = s.id
//       JOIN departments d ON s.department_id = d.id
//       GROUP BY d.name
//       ORDER BY d.name
//     `);
//     const requestsPerDept = requestsPerDeptResult.rows || [];

//     // Render admin-reports with safe data
//     res.render("admin-reports", {
//       user: req.session.user || null,
//       total,
//       approved,
//       rejected,
//       payments,
//        requestsPerDept
//       // requestsPerDept: Array.isArray(requestsPerDept.rows) ? requestsPerDept.rows : [] 
//         // requestsPerDept: requestsPerDept?.rows || []  
//     });

//   } catch (err) {
//     console.error("Error loading reports:", err);
//     res.status(500).send("Server error");
//   }
// });

// export default router;


import express from "express";
import pool from "../db.js";
import { requireRole } from "../utils/authMiddleware.js";

const router = express.Router();

// Admin Reports Route
router.get("/reports", requireRole("admin"), async (req, res) => {
  try {
    // Total requests
    const totalRequestsResult = await pool.query("SELECT COUNT(*) AS count FROM requests");
    const total = Number(totalRequestsResult.rows[0]?.count || 0);

    // Approved requests
    const approvedResult = await pool.query("SELECT COUNT(*) AS count FROM requests WHERE status='approved'");
    const approved = Number(approvedResult.rows[0]?.count || 0);

    // Rejected requests
    const rejectedResult = await pool.query("SELECT COUNT(*) AS count FROM requests WHERE status='rejected'");
    const rejected = Number(rejectedResult.rows[0]?.count || 0);

    // Total payments collected
    const totalPaymentsResult = await pool.query(`
      SELECT COALESCE(SUM(fee),0) AS total
      FROM services s
      JOIN requests r ON s.id = r.service_id
      WHERE r.status='approved'
    `);
    const payments = Number(totalPaymentsResult.rows[0]?.total || 0);

    // Requests per department
    const requestsPerDeptResult = await pool.query(`
      SELECT d.name AS department, COUNT(r.id) AS total_requests
      FROM requests r
      JOIN services s ON r.service_id = s.id
      JOIN departments d ON s.department_id = d.id
      GROUP BY d.name
      ORDER BY d.name
    `);
    const requestsPerDept = requestsPerDeptResult.rows || [];

    // ✅ Safe render
    res.render("admin-reports", {
      user: req.session.user || null,
      total,
      approved,
      rejected,
      payments,
      requestsPerDept // 🔥 آرایه مستقیم
    });

  } catch (err) {
    console.error("Error loading reports:", err);
    res.status(500).send("Server error");
  }
});

export default router;
