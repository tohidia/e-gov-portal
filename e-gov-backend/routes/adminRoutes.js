// import express from "express";
// import adminController from "../controllers/adminController.js";
// import auth from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/users", auth, adminController.getAllUsers);
// router.get("/requests", auth, adminController.getAllRequests);
// router.delete("/user/:id", auth, adminController.deleteUser);

// export default router; // ✅ حالا میشه با import استفاده کرد



// import express from "express";
// import { getAllUsers, getAllRequests, deleteUser } from "../controllers/adminController.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // فقط ادمین بتواند این مسیرها را ببیند
// router.get("/users", verifyToken, getAllUsers);
// router.get("/requests", verifyToken, getAllRequests);
// router.delete("/user/:id", verifyToken, deleteUser);

// export default router;

// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

// import express from "express";
// import { getRequests, approveRequest, rejectRequest, deleteRequest } from "../controllers/adminController.js";
// // import { verifyToken } from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // فقط ادمین‌ها اجازه دارند
// router.get("/requests", verifyToken, adminMiddleware, getRequests);
// router.patch("/requests/:id/approve", verifyToken, adminMiddleware, approveRequest);
// router.patch("/requests/:id/reject", verifyToken, adminMiddleware, rejectRequest);
// router.delete("/requests/:id", verifyToken, adminMiddleware, deleteRequest);

// export default router;
// import express from "express";
// import { verifyToken } from "../middleware/authMiddleware.js";
// import { adminMiddleware } from "../middleware/adminMiddleware.js";

// const router = express.Router();

// // مسیر مثال ادمین
// router.get("/admin-dashboard", verifyToken, adminMiddleware, (req, res) => {
//   res.json({ message: "Welcome Admin!" });
// });

// export default router;


// // routes/adminRoutes.js
// import express from "express";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
// // import { RequestModel } from "../models/requestModel.js"; // فرضاً مدل درخواست‌ها
// // import Request from '../models/Request.js';
// import { Request } from '../models/Request.js';

// const router = express.Router();

// // 🟢 گرفتن همه درخواست‌ها
// router.get("/requests", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const requests = await RequestModel.find(); // MongoDB یا دیتابیس شما
//     res.json(requests);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to load requests" });
//   }
// });

// // 🟢 تأیید درخواست
// router.patch("/requests/:id/approve", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const request = await RequestModel.findByIdAndUpdate(
//       req.params.id,
//       { status: "Approved" },
//       { new: true }
//     );
//     if (!request) return res.status(404).json({ message: "Request not found" });
//     res.json(request);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to approve request" });
//   }
// });

// // 🟢 رد درخواست
// router.patch("/requests/:id/reject", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const request = await RequestModel.findByIdAndUpdate(
//       req.params.id,
//       { status: "Rejected" },
//       { new: true }
//     );
//     if (!request) return res.status(404).json({ message: "Request not found" });
//     res.json(request);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to reject request" });
//   }
// });

// // 🟢 حذف درخواست
// router.delete("/requests/:id", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const request = await RequestModel.findByIdAndDelete(req.params.id);
//     if (!request) return res.status(404).json({ message: "Request not found" });
//     res.json({ message: "Request deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete request" });
//   }
// });

// export default router;



// import express from "express";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
// import { Request } from "../models/Request.js";

// const router = express.Router();

// // 🟢 گرفتن همه درخواست‌ها
// router.get("/requests", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const result = await Request.getAll();
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to load requests" });
//   }
// });

// // 🟢 تأیید درخواست
// router.patch("/requests/:id/approve", verifyToken, adminOnly, async (req, res) => {
//   try {
//     await Request.updateStatus(req.params.id, "Approved");
//     res.json({ message: "Request approved" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to approve request" });
//   }
// });

// // 🟢 رد درخواست
// router.patch("/requests/:id/reject", verifyToken, adminOnly, async (req, res) => {
//   try {
//     await Request.updateStatus(req.params.id, "Rejected");
//     res.json({ message: "Request rejected" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to reject request" });
//   }
// });

// // 🟢 حذف درخواست
// router.delete("/requests/:id", verifyToken, adminOnly, async (req, res) => {
//   try {
//     await Request.delete(req.params.id);
//     res.json({ message: "Request deleted" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to delete request" });
//   }
// });

// export default router;



import express from "express";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { Request } from "../models/Request.js";

const router = express.Router();

/* ============================
    ADMIN ROUTES
===============================*/

// 🟢 Admin: گرفتن تمام درخواست‌ها
router.get("/requests", verifyToken, adminOnly, async (req, res) => {
  try {
    const result = await Request.getAll();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load requests" });
  }
});

// 🟢 Admin: تایید درخواست
router.patch("/requests/:id/approve", verifyToken, adminOnly, async (req, res) => {
  try {
    await Request.updateStatus(req.params.id, "Approved");
    res.json({ message: "Request approved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve request" });
  }
});

// 🟢 Admin: رد کردن درخواست
router.patch("/requests/:id/reject", verifyToken, adminOnly, async (req, res) => {
  try {
    await Request.updateStatus(req.params.id, "Rejected");
    res.json({ message: "Request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject request" });
  }
});

// 🟢 Admin: حذف درخواست
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

// 🟡 Citizen: گرفتن درخواست‌های خودش
router.get("/requests/my-requests", verifyToken, async (req, res) => {
  try {
    const result = await Request.getByUser(req.user.id);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load your requests" });
  }
});

// 🟡 Citizen: ساخت درخواست جدید
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
