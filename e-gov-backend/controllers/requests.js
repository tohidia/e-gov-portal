import { pool } from '../config/db.js';

// گرفتن همه درخواست‌ها
export const getRequests = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM requests');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database query failed.' });
  }
};

// ایجاد درخواست جدید (برای کاربران عادی)
export const createRequest = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id; // اطلاعات کاربر از توکن

  try {
    const result = await pool.query(
      'INSERT INTO requests (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create request.' });
  }
};

// حذف درخواست (فقط Admin)
export const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM requests WHERE id = $1', [id]);
    res.json({ message: `Request ${id} deleted.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete request.' });
  }
};
