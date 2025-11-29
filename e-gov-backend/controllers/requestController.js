import pool from "../config/db.js";

// 🟢 گرفتن همه درخواست‌ها (Admin)
export const getRequests = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, 
             u.name AS citizen_name, 
             s.name AS service_name, 
             d.name AS department_name
      FROM requests r
      JOIN users u ON r.user_id = u.id
      JOIN services s ON r.service_id = s.id
      JOIN departments d ON s.department_id = d.id
      ORDER BY r.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching requests:", err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// 🟡 گرفتن درخواست خاص
export const getRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM requests WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Request not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch request" });
  }
};

// 🟢 ایجاد درخواست (Citizen)
export const createRequest = async (req, res) => {
  const { service_id, description } = req.body;
  const user_id = req.user.id; // از توکن
  try {
    const serviceData = await pool.query(
      "SELECT fee FROM services WHERE id = $1",
      [service_id]
    );
    if (serviceData.rows.length === 0)
      return res.status(404).json({ error: "Service not found" });

    const fee = serviceData.rows[0].fee;

    const result = await pool.query(
      `INSERT INTO requests (user_id, service_id, description, fee, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, 'Submitted', NOW(), NOW())
       RETURNING *`,
      [user_id, service_id, description || "", fee]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creating request:", err);
    res.status(500).json({ error: "Failed to create request" });
  }
};

// 🟣 تغییر وضعیت درخواست (Admin)
export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Approved", "Rejected", "Submitted"].includes(status))
    return res.status(400).json({ error: "Invalid status value" });

  try {
    const result = await pool.query(
      "UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Request not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating request status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// 🔴 حذف درخواست
export const deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM requests WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting request:", err);
    res.status(500).json({ error: "Failed to delete request" });
  }
};




// import pool from '../config/db.js';
// import fs from 'fs';
// import path from 'path';

// // 🟢 گرفتن همه درخواست‌ها
// export const getRequests = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT r.*, 
//              u.name AS citizen_name, 
//              s.name AS service_name, 
//              d.name AS department_name
//       FROM requests r
//       LEFT JOIN users u ON r.user_id = u.id
//       LEFT JOIN services s ON r.service_id = s.id
//       LEFT JOIN departments d ON s.department_id = d.id
//       ORDER BY r.id ASC
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching requests:', error);
//     res.status(500).json({ message: 'Server error fetching requests' });
//   }
// };

// // 🟡 گرفتن درخواست خاص بر اساس ID
// export const getRequestById = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ message: 'Invalid request ID' });

//   try {
//     const result = await pool.query(`
//       SELECT r.*, 
//              u.name AS citizen_name, 
//              s.name AS service_name, 
//              d.name AS department_name
//       FROM requests r
//       LEFT JOIN users u ON r.user_id = u.id
//       LEFT JOIN services s ON r.service_id = s.id
//       LEFT JOIN departments d ON s.department_id = d.id
//       WHERE r.id = $1
//     `, [id]);

//     if (result.rows.length === 0)
//       return res.status(404).json({ message: 'Request not found' });

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error fetching request by ID:', error);
//     res.status(500).json({ message: 'Server error fetching request' });
//   }
// };

// // 🟢 ایجاد درخواست جدید با آپلود فایل
// export const createRequest = async (req, res) => {
//   const { user_id, service_id, fee } = req.body;
//   const documents = req.files ? req.files.map(file => file.filename) : [];

//   try {
//     const result = await pool.query(`
//       INSERT INTO requests (user_id, service_id, documents, fee, status)
//       VALUES ($1, $2, $3, $4, 'Submitted') 
//       RETURNING *
//     `, [user_id, service_id, JSON.stringify(documents), fee]);

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error creating request:', error);
//     res.status(500).json({ message: 'Server error creating request' });
//   }
// };

// // 🟡 ویرایش وضعیت درخواست
// export const updateRequestStatus = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const { status } = req.body;

//   if (isNaN(id)) return res.status(400).json({ message: 'Invalid request ID' });

//   try {
//     const result = await pool.query(`
//       UPDATE requests
//       SET status = $1, updated_at = NOW()
//       WHERE id = $2 
//       RETURNING *
//     `, [status, id]);

//     if (result.rows.length === 0)
//       return res.status(404).json({ message: 'Request not found' });

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error updating request status:', error);
//     res.status(500).json({ message: 'Server error updating request' });
//   }
// };

// // 🔴 حذف درخواست
// export const deleteRequest = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ message: 'Invalid request ID' });

//   try {
//     const result = await pool.query(
//       'DELETE FROM requests WHERE id = $1 RETURNING *',
//       [id]
//     );

//     if (result.rows.length === 0)
//       return res.status(404).json({ message: 'Request not found' });

//     const deletedRequest = result.rows[0];
//     if (deletedRequest.documents) {
//       const files = Array.isArray(deletedRequest.documents)
//         ? deletedRequest.documents
//         : JSON.parse(deletedRequest.documents);

//       files.forEach(file => {
//         const filePath = path.resolve('uploads', file);
//         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//       });
//     }

//     res.json({ message: 'Request deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting request:', error);
//     res.status(500).json({ message: 'Server error deleting request' });
//   }
// };

