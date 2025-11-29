// import express from 'express';
// import {
//   getDepartments,
//   getDepartmentById,
//   createDepartment,
//   updateDepartment,
//   deleteDepartment
// } from '../controllers/departmentController.js';

// const router = express.Router();

// // گرفتن همه دپارتمان‌ها
// router.get('/', getDepartments);

// // گرفتن یک دپارتمان خاص
// router.get('/:id', getDepartmentById);

// // ایجاد دپارتمان جدید
// router.post('/', createDepartment);

// // ویرایش دپارتمان
// router.put('/:id', updateDepartment);

// // حذف دپارتمان
// router.delete('/:id', deleteDepartment);

// export default router;




// import express from 'express';
// import {
//   getDepartments,
//   getDepartmentById,
//   createDepartment,
//   updateDepartment,
//   deleteDepartment
// } from '../controllers/departmentController.js';
// import { verifyToken, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // =====================
// // 🔒 CRUD Departments (Protected)
// // =====================

// // GET all departments (any logged-in user)
// router.get('/', verifyToken, getDepartments);

// // GET department by ID (any logged-in user)
// router.get('/:id', verifyToken, getDepartmentById);

// // CREATE new department (admin only)
// router.post('/', verifyToken, adminOnly, createDepartment);

// // UPDATE department (admin only)
// router.put('/:id', verifyToken, adminOnly, updateDepartment);

// // DELETE department (admin only)
// router.delete('/:id', verifyToken, adminOnly, deleteDepartment);

// export default router;



// // routes/departmentRoutes.js
// import express from 'express';
// import {
//   getDepartments,
//   getDepartmentById,
//   createDepartment,
//   updateDepartment,
//   deleteDepartment
// } from '../controllers/departmentController.js';
// import { verifyToken, adminOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // 🟢 گرفتن همه دپارتمان‌ها (فقط ادمین‌ها می‌توانند ببینند)
// router.get('/', verifyToken, adminOnly, getDepartments);

// // 🟡 گرفتن دپارتمان خاص
// router.get('/:id', verifyToken, adminOnly, getDepartmentById);

// // 🟢 ایجاد دپارتمان جدید
// router.post('/', verifyToken, adminOnly, createDepartment);

// // 🟡 ویرایش دپارتمان
// router.put('/:id', verifyToken, adminOnly, updateDepartment);

// // 🔴 حذف دپارتمان
// router.delete('/:id', verifyToken, adminOnly, deleteDepartment);

// export default router;




import express from 'express';
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';
import { verifyToken, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, adminOnly, getDepartments);
router.get('/:id', verifyToken, adminOnly, getDepartmentById);
router.post('/', verifyToken, adminOnly, createDepartment);
router.put('/:id', verifyToken, adminOnly, updateDepartment);
router.delete('/:id', verifyToken, adminOnly, deleteDepartment);

export default router;
