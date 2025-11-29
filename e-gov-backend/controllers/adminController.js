import pool from "../config/db.js";

// 📌 دریافت همه درخواست‌ها
export const getAllRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, 
              u.name AS citizen_name,
              s.name AS service_name,
              d.name AS department_name
       FROM requests r
       LEFT JOIN users u ON r.user_id = u.id
       LEFT JOIN services s ON r.service_id = s.id
       LEFT JOIN departments d ON s.department_id = d.id
       ORDER BY r.id DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load requests" });
  }
};

// 📌 تأیید درخواست
export const approveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE requests SET status = 'Approved', updated_at = NOW()
       WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request approved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve request" });
  }
};

// 📌 رد درخواست
export const rejectRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE requests SET status = 'Rejected', updated_at = NOW()
       WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Request rejected successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject request" });
  }
};

// 📌 حذف درخواست
export const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM requests WHERE id = $1", [id]);
    res.json({ message: "Request deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete request" });
  }
};



// import { User } from "../models/User.js";
// import { Request } from "../models/Request.js";

// // 🧩 دیدن همه کاربران
// export const getAllUsers = async (req, res) => {
//   try {
//     const { rows } = await User.getAll();
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error fetching users." });
//   }
// };

// // 🧩 دیدن همه درخواست‌ها
// export const getAllRequests = async (req, res) => {
//   try {
//     const { rows } = await Request.getAll();
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error fetching requests." });
//   }
// };

// // 🧩 حذف یک کاربر
// export const deleteUser = async (req, res) => {
//   try {
//     await User.delete(req.params.id);
//     res.json({ message: "User deleted successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error deleting user." });
//   }
// };
