// // src/middleware/auth.js
// export function ensureAuth(req, res, next) {
//   if (req.session && req.session.user) return next();
//   res.redirect('/auth/login');
// }
// export function requireRole(role) {
//   return (req, res, next) => {
//     if (req.session?.user?.role === role) return next();
//     res.status(403).send('Forbidden');
//   };
// }

// // middleware/auth.js

// export function ensureLoggedIn(req, res, next) {
//   if (!req.session.user) {
//     return res.status(401).json({ error: "Not logged in" });
//   }
//   next();
// }

// export function isAdmin(req, res, next) {
//   if (req.session.user?.role !== "admin") {
//     return res.status(403).json({ error: "Admins only" });
//   }
//   next();
// }

// export function isOfficer(req, res, next) {
//   if (req.session.user?.role !== "officer") {
//     return res.status(403).json({ error: "Officers only" });
//   }
//   next();
// }

// export function isCitizen(req, res, next) {
//   if (req.session.user?.role !== "citizen") {
//     return res.status(403).json({ error: "Citizens only" });
//   }
//   next();
// }

// src/middleware/auth.js

// src/middleware/auth.js

export function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: "Not logged in" });
    }
    if (req.session.user.role !== role) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }
    next();
  };
}
