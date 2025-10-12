const express = require('express');
const db = require('./db.cjs');

const app = express();
app.use(express.json());

// لیست کاربران
app.get('/users', async (req, res) => {
  const users = await db('users').select('*');
  res.json(users);
});

// اضافه کردن کاربر جدید
app.post('/users', async (req, res) => {
  const { name, email, password_hash, role, national_id, dob } = req.body;
  const [id] = await db('users').insert({ name, email, password_hash, role, national_id, dob }).returning('id');
  res.json({ id });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
