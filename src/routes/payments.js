import express from "express";
import pool from "../db.js";
// import { requireRole } from "../utils/roleMiddleware.js";
import { requireRole } from "../utils/authMiddleware.js";


const router = express.Router();

// نمایش صفحه پرداخت
router.get("/pay/:requestId", requireRole("citizen"), async (req, res) => {
  const { requestId } = req.params;

  const result = await pool.query(
    `SELECT p.id, p.amount, p.status, s.name AS service_name
     FROM payments p
     JOIN requests r ON p.request_id = r.id
     JOIN services s ON r.service_id = s.id
     WHERE p.request_id = $1`,
    [requestId]
  );

  if (result.rows.length === 0) {
    return res.status(404).send("Payment not found");
  }

  const payment = result.rows[0];
  res.render("payment-page", { user: req.session.user, payment, requestId });
});

// شبیه‌سازی پرداخت موفق
router.post("/pay/:requestId", requireRole("citizen"), async (req, res) => {
  const { requestId } = req.params;

  await pool.query("UPDATE payments SET status = 'paid' WHERE request_id = $1", [requestId]);

  res.render("payment-success", { user: req.session.user, requestId });
});

export default router;
