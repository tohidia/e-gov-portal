// import express from "express";
// import pool from "../db.js";
// // import { requireRole } from "../utils/roleMiddleware.js";
// import { requireRole } from "../utils/authMiddleware.js";


// const router = express.Router();

// // لیست همه درخواست‌های citizens برای officer
// router.get("/requests", requireRole("officer"), async (req, res) => {
//   const result = await pool.query(
//     `SELECT r.id, u.name AS citizen_name, s.name AS service_name, r.status, r.created_at
//      FROM requests r
//      JOIN users u ON r.citizen_id = u.id
//      JOIN services s ON r.service_id = s.id
//      ORDER BY r.created_at DESC`
//   );
//   res.render("officer-requests", { user: req.session.user, requests: result.rows });
// });

// // نمایش جزئیات یک درخواست
// router.get("/requests/:id", requireRole("officer"), async (req, res) => {
//   const { id } = req.params;
//   const result = await pool.query(
//     `SELECT r.id, u.name AS citizen_name, s.name AS service_name, r.status, r.created_at, r.decision_note
//      FROM requests r
//      JOIN users u ON r.citizen_id = u.id
//      JOIN services s ON r.service_id = s.id
//      WHERE r.id = $1`,
//     [id]
//   );

//   if (result.rows.length === 0) {
//     return res.status(404).send("Request not found");
//   }

//   res.render("officer-request-detail", { user: req.session.user, request: result.rows[0] });
// });

// // تایید یا رد درخواست
// router.post("/requests/:id/decision", requireRole("officer"), async (req, res) => {
//   const { id } = req.params;
//   const { decision, note } = req.body;
//   const officer_id = req.session.user.id;

//   await pool.query(
//     `UPDATE requests 
//      SET status = $1, decision_note = $2, reviewed_by = $3, updated_at = NOW()
//      WHERE id = $4`,
//     [decision, note, officer_id, id]
//   );

//   res.redirect("/officer/requests");
// });

// export default router;


// routes/officer.js
import express from "express";
const router = express.Router();

// نمونه داده‌ها (در عمل از دیتابیس بگیری)
const sampleRequests = [
  { id: 101, citizen_name: "Ali Reza", service_name: "Passport Renewal", status: "Approved", created_at: new Date("2025-09-14"), documents: ["passport.pdf", "photo.jpg"] },
  { id: 102, citizen_name: "Sara Ahmadi", service_name: "Business License", status: "Under Review", created_at: new Date("2025-09-13"), documents: ["license.pdf"] },
  { id: 103, citizen_name: "Mohammad Karimi", service_name: "National ID Update", status: "Rejected", created_at: new Date("2025-09-12"), documents: ["id_card.pdf"] },
];

// -------------------
// Dashboard
// -------------------
router.get("/dashboard", (req, res) => {
  res.render("officer-dashboard", { requests: sampleRequests, query: {} });
});

// -------------------
// Filtered Requests
// -------------------
router.get("/requests", (req, res) => {
  const { name, requestId, status, service, from, to } = req.query;

  let filtered = sampleRequests;

  if (name) filtered = filtered.filter(r => r.citizen_name.toLowerCase().includes(name.toLowerCase()));
  if (requestId) filtered = filtered.filter(r => r.id === parseInt(requestId));
  if (status) filtered = filtered.filter(r => r.status === status);
  if (service) filtered = filtered.filter(r => r.service_name.toLowerCase().includes(service.toLowerCase()));
  if (from) filtered = filtered.filter(r => r.created_at >= new Date(from));
  if (to) filtered = filtered.filter(r => r.created_at <= new Date(to));

  res.render("officer-dashboard", { requests: filtered, query: req.query });
});

// -------------------
// Request Detail Page
// -------------------
router.get("/requests/:id", (req, res) => {
  const requestId = parseInt(req.params.id);
  const request = sampleRequests.find(r => r.id === requestId);

  if (!request) return res.status(404).send("Request not found");

  res.render("request-detail", { request });
});

// -------------------
// Approve Request (AJAX)
// -------------------
router.post("/requests/:id/approve", (req, res) => {
    const requestId = parseInt(req.params.id);
    const request = sampleRequests.find(r => r.id === requestId);

    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = "Approved";
    res.json({ status: request.status });
});

// -------------------
// Reject Request (AJAX)
// -------------------
router.post("/requests/:id/reject", (req, res) => {
    const requestId = parseInt(req.params.id);
    const request = sampleRequests.find(r => r.id === requestId);

    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = "Rejected";
    res.json({ status: request.status });
});

export default router;
