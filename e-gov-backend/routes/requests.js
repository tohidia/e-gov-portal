// // routes/requests.js
// import express from 'express';
// import { getRequests, createRequest, deleteRequest } from '../controllers/requests.js';
// import { verifyToken, adminOnly, citizenOnly } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // همه کاربران لاگین کرده می‌توانند ببینند
// router.get('/requests', verifyToken, getRequests);

// // فقط کاربران عادی (citizen) می‌توانند درخواست جدید ایجاد کنند
// router.post('/requests', verifyToken, citizenOnly, createRequest);

// // فقط Admin می‌تواند حذف کند
// router.delete('/requests/:id', verifyToken, adminOnly, deleteRequest);

// export default router;


// const express = require('express');
// const router = express.Router();
// const auth = require('../middleware/auth');
// const db = require('../db'); // pool

// router.post('/:id/approve', auth, async (req, res) => {
//   const id = Number(req.params.id);
//   const user = req.user;
//   try {
//     // optional: role check
//     if (!['officer','dept_head','admin'].includes(user.role)) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     // transaction + lock
//     const client = await db.connect();
//     try {
//       await client.query('BEGIN');
//       const { rows } = await client.query(
//         `SELECT r.*, s.department_id FROM requests r JOIN services s ON r.service_id=s.id WHERE r.id=$1 FOR UPDATE`,
//         [id]
//       );
//       if (rows.length === 0) throw new Error('Request not found');

//       const reqRow = rows[0];
//       if (user.role === 'officer' && user.department_id !== reqRow.department_id) {
//         throw new Error('Forbidden: different department');
//       }

//       await client.query(`UPDATE requests SET status='approved', updated_at=now() WHERE id=$1`, [id]);
//       await client.query(`INSERT INTO notifications(user_id, request_id, message) VALUES($1,$2,$3)`,
//         [reqRow.citizen_id, id, `Your request ${id} was approved.`]);
//       await client.query('COMMIT');
//       res.json({ success: true, message: 'Approved' });
//     } catch (e) {
//       await client.query('ROLLBACK');
//       throw e;
//     } finally {
//       client.release();
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ success: false, message: err.message });
//   }
// });
// module.exports = router;
