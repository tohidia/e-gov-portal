import express from 'express';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

// گرفتن همه سرویس‌ها
router.get('/', getServices);

// گرفتن سرویس خاص
router.get('/:id', getServiceById);

// ایجاد سرویس جدید
router.post('/', createService);

// ویرایش سرویس
router.put('/:id', updateService);

// حذف سرویس
router.delete('/:id', deleteService);

export default router;
