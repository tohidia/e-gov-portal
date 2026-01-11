// // adminRoutes.js

// import express from "express";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
// import { Request } from "../models/Request.js";

// const router = express.Router();

// /* ============================
//     ADMIN ROUTES
// ===============================*/

// // 🟢 Admin: گرفتن تمام درخواست‌ها
// router.get("/requests", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const result = await Request.getAll();
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to load requests" });
//   }
// });

// // 🟢 Admin: تایید درخواست
// router.patch("/requests/:id/approve", verifyToken, adminOnly, async (req, res) => {
//   try {
//     await Request.updateStatus(req.params.id, "Approved");
//     res.json({ message: "Request approved" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to approve request" });
//   }
// });

// // 🟢 Admin: رد کردن درخواست
// router.patch("/requests/:id/reject", verifyToken, adminOnly, async (req, res) => {
//   try {
//     await Request.updateStatus(req.params.id, "Rejected");
//     res.json({ message: "Request rejected" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to reject request" });
//   }
// });

// // 🟢 Admin: حذف درخواست
// router.delete("/requests/:id", verifyToken, adminOnly, async (req, res) => {
//   try {
//     await Request.delete(req.params.id);
//     res.json({ message: "Request deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete request" });
//   }
// });


// /* ============================
//     CITIZEN ROUTES
// ===============================*/

// // 🟡 Citizen: گرفتن درخواست‌های خودش
// router.get("/requests/my-requests", verifyToken, async (req, res) => {
//   try {
//     const result = await Request.getByUser(req.user.id);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to load your requests" });
//   }
// });

// // 🟡 Citizen: ساخت درخواست جدید
// router.post("/requests", verifyToken, async (req, res) => {
//   try {
//     const { service_id, description } = req.body;

//     await Request.create({
//       user_id: req.user.id,
//       service_id,
//       description,
//     });

//     res.json({ message: "Request submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create request" });
//   }
// });

// export default router;




// routes/adminRoutes.js
import express from "express";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { Request } from "../models/Request.js";

const router = express.Router();

/* ============================
    ADMIN ROUTES
===============================*/

// گرفتن تمام درخواست‌ها
router.get("/requests", verifyToken, adminOnly, async (req, res) => {
  try {
    const result = await Request.getAll();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load requests" });
  }
});

// تایید درخواست
router.patch("/requests/:id/approve", verifyToken, adminOnly, async (req, res) => {
  try {
    await Request.updateStatus(req.params.id, "Approved");
    res.json({ message: "Request approved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve request" });
  }
});

// رد کردن درخواست
router.patch("/requests/:id/reject", verifyToken, adminOnly, async (req, res) => {
  try {
    await Request.updateStatus(req.params.id, "Rejected");
    res.json({ message: "Request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject request" });
  }
});

// حذف درخواست
router.delete("/requests/:id", verifyToken, adminOnly, async (req, res) => {
  try {
    await Request.delete(req.params.id);
    res.json({ message: "Request deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete request" });
  }
});

/* ============================
    CITIZEN ROUTES
===============================*/

// گرفتن درخواست‌های خودش
router.get("/requests/my-requests", verifyToken, async (req, res) => {
  try {
    const result = await Request.getByUser(req.user.id);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load your requests" });
  }
});

// ساخت درخواست جدید
router.post("/requests", verifyToken, async (req, res) => {
  try {
    const { service_id, description } = req.body;

    await Request.create({
      user_id: req.user.id,
      service_id,
      description,
    });

    res.json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create request" });
  }
});

export default router;
