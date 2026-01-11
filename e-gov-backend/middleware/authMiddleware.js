
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// /**
//  * 🟢 Middleware: Verify JWT Token (Header → Cookie)
//  */
// export const verifyToken = (req, res, next) => {
//   try {
//     let token = null;

//     // 1) Authorization Header → Bearer token
//     if (req.headers.authorization?.startsWith("Bearer ")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     // 2) Cookie Token
//     if (!token && req.cookies?.token) {
//       token = req.cookies.token;
//     }

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Access denied. No token provided." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; // { id, role, ... }

//     next();
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "JWT expired. Please log in again." });
//     }
//     return res.status(401).json({ message: "Invalid token." });
//   }
// };

// /**
//  * 🟣 Middleware: Admin-only
//  */
// export const adminOnly = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res
//       .status(403)
//       .json({ message: "Access denied. Admins only." });
//   }
//   next();
// };

// /**
//  * 🔵 Middleware: Citizen-only
//  */
// export const citizenOnly = (req, res, next) => {
//   if (!req.user || req.user.role !== "citizen") {
//     return res
//       .status(403)
//       .json({ message: "Access denied. Citizens only." });
//   }
//   next();
// };



// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * 🟢 Verify JWT Token (Header or Cookie)
 */
export const verifyToken = (req, res, next) => {
  try {
    let token = null;

    // 1) Authorization Header → Bearer token
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2) Cookie fallback
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, email, ... }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "JWT expired. Please log in again." });
    }
    return res.status(401).json({ message: "Invalid token." });
  }
};

/**
 * 🟣 Admin-only access
 */
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

/**
 * 🔵 Citizen-only access
 */
export const citizenOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "citizen") {
    return res.status(403).json({ message: "Access denied. Citizens only." });
  }
  next();
};

/**
 * 🟡 Officer-only access
 */
export const officerOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "officer") {
    return res.status(403).json({ message: "Access denied. Officers only." });
  }
  next();
};



