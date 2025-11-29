// import pool from '../config/db.js';

// // گرفتن همه سرویس‌ها
// export const getServices = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT s.*, d.name AS department_name
//       FROM services s
//       LEFT JOIN departments d ON s.department_id = d.id
//       ORDER BY s.id ASC
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching services:', error);
//     res.status(500).json({ message: 'Server error fetching services' });
//   }
// };

// // گرفتن سرویس خاص بر اساس ID
// export const getServiceById = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ message: 'Invalid service ID' });

//   try {
//     const result = await pool.query(
//       `SELECT s.*, d.name AS department_name
//        FROM services s
//        LEFT JOIN departments d ON s.department_id = d.id
//        WHERE s.id = $1`,
//       [id]
//     );

//     if (result.rows.length === 0)
//       return res.status(404).json({ message: 'Service not found' });

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error fetching service by ID:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ایجاد سرویس جدید
// export const createService = async (req, res) => {
//   const { name, description, department_id } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO services (name, description, department_id)
//        VALUES ($1, $2, $3) RETURNING *`,
//       [name, description, department_id]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     console.error('Error creating service:', error);
//     res.status(500).json({ message: 'Server error creating service' });
//   }
// };

// // ویرایش سرویس
// export const updateService = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const { name, description, department_id } = req.body;
//   if (isNaN(id)) return res.status(400).json({ message: 'Invalid service ID' });

//   try {
//     const result = await pool.query(
//       `UPDATE services
//        SET name = $1, description = $2, department_id = $3
//        WHERE id = $4 RETURNING *`,
//       [name, description, department_id, id]
//     );

//     if (result.rows.length === 0)
//       return res.status(404).json({ message: 'Service not found' });

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error updating service:', error);
//     res.status(500).json({ message: 'Server error updating service' });
//   }
// };

// // حذف سرویس
// export const deleteService = async (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   if (isNaN(id)) return res.status(400).json({ message: 'Invalid service ID' });

//   try {
//     const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
//     if (result.rows.length === 0)
//       return res.status(404).json({ message: 'Service not found' });

//     res.json({ message: 'Service deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting service:', error);
//     res.status(500).json({ message: 'Server error deleting service' });
//   }
// };


// controllers/serviceController.js
import pool from '../config/db.js';

// 🟢 گرفتن همه سرویس‌ها
export const getServices = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, d.name AS department_name
      FROM services s
      LEFT JOIN departments d ON s.department_id = d.id
      ORDER BY s.id ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error fetching services' });
  }
};

// 🟢 گرفتن سرویس خاص بر اساس ID
export const getServiceById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid service ID' });

  try {
    const result = await pool.query(
      `SELECT s.*, d.name AS department_name
       FROM services s
       LEFT JOIN departments d ON s.department_id = d.id
       WHERE s.id = $1`,
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Service not found' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    res.status(500).json({ message: 'Server error fetching service by ID' });
  }
};

// 🟢 ایجاد سرویس جدید
export const createService = async (req, res) => {
  const { name, description, department_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO services (name, description, department_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, description, department_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Server error creating service' });
  }
};

// 🟢 ویرایش سرویس
export const updateService = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, department_id } = req.body;

  if (isNaN(id)) return res.status(400).json({ message: 'Invalid service ID' });

  try {
    const result = await pool.query(
      `UPDATE services
       SET name = $1, description = $2, department_id = $3
       WHERE id = $4 RETURNING *`,
      [name, description, department_id, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Service not found' });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Server error updating service' });
  }
};

// 🟢 حذف سرویس
export const deleteService = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ message: 'Invalid service ID' });

  try {
    const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Service not found' });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Server error deleting service' });
  }
};
