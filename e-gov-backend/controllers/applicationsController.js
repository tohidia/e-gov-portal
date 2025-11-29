import pool from '../config/db.js';

export const getApplications = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applications ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

export const createApplication = async (req, res) => {
  const { user_id, department_id, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO applications (user_id, department_id, status) VALUES ($1, $2, $3) RETURNING *',
      [user_id, department_id, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating application' });
  }
};
