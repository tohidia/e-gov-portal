exports.ensureAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) return next();
  return res.redirect('/login');
};

exports.requireRole = (roles) => (req, res, next) => {
  if (!req.session || !req.session.user) return res.redirect('/login');
  const userRole = req.session.user.role;
  if (Array.isArray(roles)) {
    if (roles.includes(userRole)) return next();
  } else {
    if (userRole === roles) return next();
  }
  return res.status(403).render('errors/403', { message: 'Access denied' });
};
