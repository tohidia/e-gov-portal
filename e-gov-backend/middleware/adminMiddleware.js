// // middleware/adminMiddleware.js
// export const adminMiddleware = (req, res, next) => {
//     // اگر req.user وجود داره و نقشش admin هست
//     if (req.user && req.user.role === 'admin') {
//         next();
//     } else {
//         res.status(403).json({ message: "Access denied. Admins only." });
//     }
// };


// middleware/adminMiddleware.js
// middleware/adminMiddleware.js
export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
