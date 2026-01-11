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

// router.get('/', verifyToken, adminOnly, getDepartments);
// router.get('/:id', verifyToken, adminOnly, getDepartmentById);
// router.post('/', verifyToken, adminOnly, createDepartment);
// router.put('/:id', verifyToken, adminOnly, updateDepartment);
// router.delete('/:id', verifyToken, adminOnly, deleteDepartment);

// export default router;



// routes/departmentRoutes.js
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
