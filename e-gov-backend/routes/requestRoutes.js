



// import express from 'express';
// import multer from 'multer';
// import pool from '../config/db.js';
// import {
//   getRequests,
//   getRequestById,
//   createRequest,
//   updateRequestStatus,
//   deleteRequest
// } from '../controllers/requestController.js';

// const router = express.Router();

// // مسیر ذخیره فایل‌ها
// const upload = multer({ dest: 'uploads/' });

// // 🟢 گرفتن همه درخواست‌ها
// router.get('/', getRequests);

// // 🟡 گرفتن درخواست خاص بر اساس ID
// router.get('/:id', getRequestById);

// // 🟢 ایجاد درخواست جدید با امکان آپلود فایل
// router.post('/', upload.array('documents'), createRequest);

// // 🟡 ویرایش وضعیت درخواست (مثلاً توسط Officer)
// router.put('/:id', updateRequestStatus);

// // 🔴 حذف درخواست
// router.delete('/:id', deleteRequest);

// // ✅ مسیرهای عملیاتی Approve / Reject
// router.patch('/:id/approve', async (req, res) => {
//   try {
//     const updated = await updateRequestStatusInternal(req.params.id, 'Approved');
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.patch('/:id/reject', async (req, res) => {
//   try {
//     const updated = await updateRequestStatusInternal(req.params.id, 'Rejected');
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // تابع داخلی برای تغییر وضعیت
// // import pool from '../config/db.js';
// const updateRequestStatusInternal = async (id, status) => {
//   const result = await pool.query(
//     'UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
//     [status, id]
//   );
//   if (result.rows.length === 0) throw new Error('Request not found');
//   return result.rows[0];
// };

// export default router;



// import express from 'express';
// import multer from 'multer';
// import pool from '../config/db.js';
// import {
//   getRequests,
//   getRequestById,
//   createRequest,
//   updateRequestStatus,
//   deleteRequest
// } from '../controllers/requestController.js';
// import { verifyToken, adminOnly, citizenOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // مسیر ذخیره فایل‌ها
// const upload = multer({ dest: 'uploads/' });

// // =====================
// // 🔒 CRUD Requests (Protected)
// // =====================

// // GET all requests (any logged-in user)
// router.get('/', verifyToken, getRequests);

// // GET request by ID (any logged-in user)
// router.get('/:id', verifyToken, getRequestById);

// // CREATE new request (citizen only)
// router.post('/', verifyToken, citizenOnly, upload.array('documents'), createRequest);

// // UPDATE request status (admin only)
// router.put('/:id/status', verifyToken, adminOnly, updateRequestStatus);

// // DELETE request (admin only)
// router.delete('/:id', verifyToken, adminOnly, deleteRequest);

// // Approve / Reject (admin only)
// router.patch('/:id/approve', verifyToken, adminOnly, async (req, res) => {
//   try {
//     const updated = await updateRequestStatusInternal(req.params.id, 'Approved');
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.patch('/:id/reject', verifyToken, adminOnly, async (req, res) => {
//   try {
//     const updated = await updateRequestStatusInternal(req.params.id, 'Rejected');
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // تابع داخلی برای تغییر وضعیت
// const updateRequestStatusInternal = async (id, status) => {
//   const result = await pool.query(
//     'UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
//     [status, id]
//   );
//   if (result.rows.length === 0) throw new Error('Request not found');
//   return result.rows[0];
// };

// export default router;




// // routes/requestRoutes.js
// import express from 'express';
// import multer from 'multer';
// import pool from '../config/db.js';
// import {
//   getRequests,
//   getRequestById,
//   createRequest,
//   updateRequestStatus,
//   deleteRequest
// } from '../controllers/requestController.js';

// import { verifyToken, adminOnly, citizenOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // ⚙️ مسیر ذخیره فایل‌ها
// const upload = multer({ dest: 'uploads/' });

// // 🟢 گرفتن همه درخواست‌ها (فقط ادمین)
// router.get('/', verifyToken, adminOnly, getRequests);

// // 🟡 گرفتن درخواست خاص (هر دو می‌توانند ببینند)
// router.get('/:id', verifyToken, getRequestById);

// // 🟢 ایجاد درخواست جدید (فقط شهروند)
// router.post('/', verifyToken, citizenOnly, upload.array('documents'), createRequest);

// // 🟡 ویرایش وضعیت درخواست (فقط ادمین)
// router.put('/:id/status', verifyToken, adminOnly, updateRequestStatus);

// // 🔴 حذف درخواست (فقط ادمین)
// router.delete('/:id', verifyToken, adminOnly, deleteRequest);

// // ✅ مسیرهای عملیاتی Approve / Reject (فقط ادمین)
// router.patch('/:id/approve', verifyToken, adminOnly, async (req, res) => {
//   try {
//     const updated = await updateRequestStatusInternal(req.params.id, 'Approved');
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.patch('/:id/reject', verifyToken, adminOnly, async (req, res) => {
//   try {
//     const updated = await updateRequestStatusInternal(req.params.id, 'Rejected');
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ⚙️ تابع داخلی برای تغییر وضعیت
// const updateRequestStatusInternal = async (id, status) => {
//   const result = await pool.query(
//     'UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
//     [status, id]
//   );
//   if (result.rows.length === 0) throw new Error('Request not found');
//   return result.rows[0];
// };

// export default router;



// import express from "express";
// import multer from "multer";
// import {
//   getRequests,
//   getRequestById,
//   createRequest,
//   updateRequestStatus,
//   deleteRequest,
// } from "../controllers/requestController.js";
// import { verifyToken, adminOnly, citizenOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ⚙️ تنظیم آپلود فایل (در صورت نیاز)
// const upload = multer({ dest: "uploads/" });

// // 🟢 گرفتن همه درخواست‌ها (فقط Admin)
// router.get("/", verifyToken, adminOnly, getRequests);

// // 🟡 گرفتن درخواست خاص (Admin یا صاحب درخواست)
// router.get("/:id", verifyToken, getRequestById);

// // 🟢 ایجاد درخواست جدید (فقط Citizen)
// router.post("/", verifyToken, citizenOnly, upload.array("documents"), createRequest);

// // 🟣 تغییر وضعیت درخواست (فقط Admin)
// router.put("/:id/status", verifyToken, adminOnly, updateRequestStatus);

// // 🔴 حذف درخواست (فقط Admin)
// router.delete("/:id", verifyToken, adminOnly, deleteRequest);

// // ✅ مسیرهای سریع برای Approve و Reject
// router.patch("/:id/approve", verifyToken, adminOnly, async (req, res) => {
//   try {
//     req.body.status = "Approved";
//     const updated = await updateRequestStatus(req, res);
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.patch("/:id/reject", verifyToken, adminOnly, async (req, res) => {
//   try {
//     req.body.status = "Rejected";
//     const updated = await updateRequestStatus(req, res);
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;



// import express from "express";
// import multer from "multer";
// import pool from "../config/db.js";
// import { verifyToken, adminOnly, citizenOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // Admin: همه درخواست‌ها
// router.get("/", verifyToken, adminOnly, async (req, res) => {
//   const result = await pool.query("SELECT * FROM requests ORDER BY created_at DESC");
//   res.json(result.rows);
// });

// // Citizen: درخواست‌های خودش
// router.get("/my-requests", verifyToken, citizenOnly, async (req, res) => {
//   const result = await pool.query("SELECT * FROM requests WHERE citizen_id=$1 ORDER BY created_at DESC", [req.user.id]);
//   res.json(result.rows);
// });

// // گرفتن درخواست خاص
// router.get("/:id", verifyToken, async (req, res) => {
//   const { id } = req.params;
//   const result = await pool.query("SELECT * FROM requests WHERE id=$1", [id]);
//   if (!result.rows.length) return res.status(404).json({ error: "Request not found" });
//   const request = result.rows[0];
//   if (req.user.role !== "admin" && req.user.id !== request.citizen_id) {
//     return res.status(403).json({ error: "Access denied" });
//   }
//   res.json(request);
// });

// // ایجاد درخواست جدید (Citizen)
// router.post("/", verifyToken, citizenOnly, upload.array("documents"), async (req, res) => {
//   const { title, description } = req.body;
//   const files = req.files.map(f => f.path);
//   const result = await pool.query(
//     "INSERT INTO requests (title,description,documents,citizen_id,status,created_at) VALUES($1,$2,$3,$4,'Pending',NOW()) RETURNING *",
//     [title, description, files, req.user.id]
//   );
//   res.status(201).json(result.rows[0]);
// });

// // تغییر وضعیت (Admin)
// router.put("/:id/status", verifyToken, adminOnly, async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   const result = await pool.query("UPDATE requests SET status=$1 WHERE id=$2 RETURNING *", [status, id]);
//   res.json(result.rows[0]);
// });

// // حذف درخواست (Admin)
// router.delete("/:id", verifyToken, adminOnly, async (req, res) => {
//   const { id } = req.params;
//   await pool.query("DELETE FROM requests WHERE id=$1", [id]);
//   res.json({ message: "Request deleted successfully" });
// });

// export default router;





// import express from "express";
// import multer from "multer";
// import pool from "../config/db.js";
// import { verifyToken, adminOnly, citizenOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // Admin: همه درخواست‌ها
// router.get("/", verifyToken, adminOnly, async (req, res) => {
//   const result = await pool.query("SELECT * FROM requests ORDER BY created_at DESC");
//   res.json(result.rows);
// });

// // Citizen: درخواست‌های خودش
// router.get("/my-requests", verifyToken, citizenOnly, async (req, res) => {
//   const result = await pool.query(
//     "SELECT * FROM requests WHERE citizen_id=$1 ORDER BY created_at DESC",
//     [req.user.id]
//   );
//   res.json(result.rows);
// });

// // تغییر وضعیت (Approve / Reject)
// router.put("/:id/status", verifyToken, adminOnly, async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   const result = await pool.query(
//     "UPDATE requests SET status=$1 WHERE id=$2 RETURNING *",
//     [status, id]
//   );
//   res.json(result.rows[0]);
// });

// // حذف درخواست
// router.delete("/:id", verifyToken, adminOnly, async (req, res) => {
//   const { id } = req.params;
//   await pool.query("DELETE FROM requests WHERE id=$1", [id]);
//   res.json({ message: "Request deleted successfully" });
// });

// export default router;



// // ✅ routes/requestRoutes.js

import express from "express";
import pool from "../config/db.js";
import { verifyToken, adminOnly, citizenOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ---------------------------
// Admin: همه درخواست‌ها
// ---------------------------
router.get("/", verifyToken, adminOnly, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM requests ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Database error" });
  }
});

// ---------------------------
// Citizen: درخواست‌های خودش
// ---------------------------
router.get("/my-requests", verifyToken, citizenOnly, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM requests WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Database error" });
  }
});

// ---------------------------
// تغییر وضعیت درخواست (Approve / Reject) - Admin
// ---------------------------
router.put("/:id/status", verifyToken, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Database error" });
  }
});

// ---------------------------
// حذف درخواست - Admin
// ---------------------------
router.delete("/:id", verifyToken, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM requests WHERE id=$1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
