const bcrypt = require('bcryptjs');
const db = require('../db'); // فرض: این فایل knex instance صادر می‌کنه

function redirectByRole(role) {
  if (role === 'admin') return '/admin';
  if (role === 'dept_head' || role === 'officer') return '/officer';
  return '/citizen';
}

exports.showLogin = (req, res) => {
  res.render('auth/login', { error: null });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db('users').where({ email }).first();
    if (!user) return res.render('auth/login', { error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.render('auth/login', { error: 'Invalid credentials' });

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department_id: user.department_id
    };

    return res.redirect(redirectByRole(user.role));
  } catch (err) {
    console.error(err);
    return res.render('auth/login', { error: 'Server error' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};

exports.showRegister = (req, res) => {
  res.render('auth/register', { error: null });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, national_id } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const [user] = await db('users').insert({
      name, email, national_id, password_hash: hash, role: 'citizen'
    }).returning(['id','name','email','role']);
    req.session.user = { id: user.id, name: user.name, role: user.role };
    res.redirect('/citizen');
  } catch (err) {
    console.error(err);
    res.render('auth/register', { error: 'Could not register' });
  }
};
