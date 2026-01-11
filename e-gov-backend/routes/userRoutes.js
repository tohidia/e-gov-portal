
// import express from "express";
// import { registerUser, loginUser, getUsers } from "../controllers/userController.js";
// import { verifyToken, adminOnly, citizenOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // مسیر ثبت‌نام
// router.post("/register", registerUser);

// // مسیر لاگین
// router.post("/login", loginUser);

// // مسیر گرفتن همه کاربران (Admin)
// router.get("/", verifyToken, adminOnly, getUsers);

// export default router;




// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/userController.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// مسیر ثبت‌نام
router.post("/register", registerUser);

// مسیر لاگین
router.post("/login", loginUser);

// مسیر گرفتن همه کاربران (Admin)
router.get("/", verifyToken, adminOnly, getUsers);

export default router;
