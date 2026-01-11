// import pool from "../config/db.js";

// // 🟢 گرفتن همه درخواست‌ها (Admin)
// export const getRequests = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT r.*, 
//              u.name AS citizen_name, 
//              s.name AS service_name, 
//              d.name AS department_name
//       FROM requests r
//       JOIN users u ON r.user_id = u.id
//       JOIN services s ON r.service_id = s.id
//       JOIN departments d ON s.department_id = d.id
//       ORDER BY r.id DESC
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("❌ Error fetching requests:", err);
//     res.status(500).json({ error: "Failed to fetch requests" });
//   }
// };

// // 🟡 گرفتن درخواست خاص
// export const getRequestById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query(
//       `SELECT * FROM requests WHERE id = $1`,
//       [id]
//     );
//     if (result.rows.length === 0)
//       return res.status(404).json({ error: "Request not found" });
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch request" });
//   }
// };

// // 🟢 ایجاد درخواست (Citizen)
// export const createRequest = async (req, res) => {
//   const { service_id, description } = req.body;
//   const user_id = req.user.id; // از توکن
//   try {
//     const serviceData = await pool.query(
//       "SELECT fee FROM services WHERE id = $1",
//       [service_id]
//     );
//     if (serviceData.rows.length === 0)
//       return res.status(404).json({ error: "Service not found" });

//     const fee = serviceData.rows[0].fee;

//     const result = await pool.query(
//       `INSERT INTO requests (user_id, service_id, description, fee, status, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, 'Submitted', NOW(), NOW())
//        RETURNING *`,
//       [user_id, service_id, description || "", fee]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error("❌ Error creating request:", err);
//     res.status(500).json({ error: "Failed to create request" });
//   }
// };

// // 🟣 تغییر وضعیت درخواست (Admin)
// export const updateRequestStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   if (!["Approved", "Rejected", "Submitted"].includes(status))
//     return res.status(400).json({ error: "Invalid status value" });

//   try {
//     const result = await pool.query(
//       "UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
//       [status, id]
//     );

//     if (result.rows.length === 0)
//       return res.status(404).json({ error: "Request not found" });

//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("❌ Error updating request status:", err);
//     res.status(500).json({ error: "Failed to update status" });
//   }
// };

// // 🔴 حذف درخواست
// export const deleteRequest = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query("DELETE FROM requests WHERE id=$1 RETURNING *", [id]);
//     if (result.rows.length === 0)
//       return res.status(404).json({ error: "Request not found" });
//     res.json({ message: "Request deleted successfully" });
//   } catch (err) {
//     console.error("❌ Error deleting request:", err);
//     res.status(500).json({ error: "Failed to delete request" });
//   }
// };


import pool from "../config/db.js";

// GET ALL REQUESTS
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
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

// CREATE REQUEST
export const createRequest = async (req, res) => {
  const { service_id, description } = req.body;

  try {
    const service = await pool.query("SELECT fee FROM services WHERE id = $1", [service_id]);
    if (service.rows.length === 0)
      return res.status(404).json({ error: "Service not found" });

    const result = await pool.query(
      `INSERT INTO requests (user_id, service_id, description, fee, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, 'Submitted', NOW(), NOW())
       RETURNING *`,
      [req.user.id, service_id, description || "", service.rows[0].fee]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create request" });
  }
};

// UPDATE STATUS
export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  if (!["Approved", "Rejected", "Submitted"].includes(status))
    return res.status(400).json({ error: "Invalid status" });

  try {
    const result = await pool.query(
      "UPDATE requests SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
      [status, req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Request not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update request" });
  }
};

// DELETE REQUEST
export const deleteRequest = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM requests WHERE id=$1 RETURNING *", [
      req.params.id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Request not found" });

    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete request" });
  }
};
