import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // توکن از کوکی یا هدر
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // بررسی توکن
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      // ذخیره اطلاعات کاربر در req
      req.user = user;

      next(); // ادامه بده
    });
  } catch (error) {
    console.error("verifyToken Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
