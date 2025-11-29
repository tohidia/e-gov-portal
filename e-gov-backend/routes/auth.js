import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

// کاربر نمونه
const users = [
  { id: 1, email: 'admin@example.com', password: '123456', role: 'admin' },
  { id: 2, email: 'user@example.com', password: '123456', role: 'citizen' },
];

// لاگین
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

  // ایجاد توکن JWT
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

export default router;
