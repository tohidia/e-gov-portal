// routes/requestRoutes.js
import express from "express";
import pool from "../config/db.js";
import { verifyToken, adminOnly, citizenOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin: همه درخواست‌ها
router.get("/", verifyToken, adminOnly, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM requests ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ message: "Database error" });
  }
});

// Citizen: درخواست‌های خودش
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

// تغییر وضعیت درخواست (Approve / Reject) - Admin
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

// حذف درخواست - Admin
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


