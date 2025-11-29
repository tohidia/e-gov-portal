import pool from '../config/db.js';

// گرفتن تمام دپارتمان‌ها
export const getDepartments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM departments ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Server error fetching departments' });
  }
};

// گرفتن دپارتمان خاص بر اساس ID
export const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM departments WHERE id = $1', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Department not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching department by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ایجاد دپارتمان جدید
export const createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO departments (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Server error creating department' });
  }
};

// ویرایش دپارتمان
export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE departments SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Department not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Server error updating department' });
  }
};

// حذف دپارتمان
export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM departments WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Department not found' });
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Server error deleting department' });
  }
};
