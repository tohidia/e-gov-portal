// import express from "express";

// import path from "path";
// import session from "express-session";
// import pgSession from "connect-pg-simple";
// import pool from "./db.js"; // کانکشن به Postgres
// import routes from "./routes/index.js";
// import servicesRoutes from "./routes/services.js";
// import authRoutes from "./routes/auth.js";
// import contactRoutes from "./routes/contact.js";
// import aboutRoutes from "./routes/about.js";
// import citizenRoutes from "./routes/citizen.js";
// import officerRoutes from "./routes/officer.js";
// import adminRoutes from "./routes/admin.js";
// import paymentsRouter from "./routes/payments.js";

// const app = express();
// const PORT = process.env.PORT || 5000;
// // const requestRoutes = require('./src/routes/requests');

// // ========== EJS setup ==========
// app.set("view engine", "ejs");
// app.set("views", path.join(process.cwd(), "src/views"));

// // ========== Static Files ==========
// app.use(express.static(path.join(process.cwd(), "src/public")));

// // ========== Body Parsing ==========
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ========== Session Setup ==========
// const PgStore = pgSession(session);

// app.use(
//   session({
//     store: new PgStore({
//       pool: pool,          // اتصال به دیتابیس
//       tableName: "session" // جدول session در Postgres ساخته میشه
//     }),
//     secret: process.env.SESSION_SECRET || "dev-secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 // 1 روز
//     }
//   })
// );

// // ========== Middleware: Attach user ==========
// app.use((req, res, next) => {


// // ========== Start Server ==========
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });


//   res.locals.user = req.session.user || null; // در EJS همیشه user در دسترس باشه
//   next();
// });

// // ========== Routes ==========
// app.use("/", routes);
// app.use("/services", servicesRoutes);
// app.use("/auth", authRoutes);
// app.use("/contact", contactRoutes);
// app.use("/about", aboutRoutes);
// app.use("/citizen", citizenRoutes);
// app.use("/officer", officerRoutes);
// app.use("/admin", adminRoutes);

// app.use("/payments", paymentsRouter);
// app.use('/uploads', express.static('uploads'));
// // app.use('/', requestRoutes);







// // ========== Start Server ==========
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });

// // 

// server.js
// import express from "express";
// import path from "path";
// import session from "express-session";
// import pgSession from "connect-pg-simple";
// import pool from "./db.js"; // PostgreSQL connection
// import routes from "./routes/index.js";
// import servicesRoutes from "./routes/services.js";
// import authRoutes from "./routes/auth.js";
// import contactRoutes from "./routes/contact.js";
// import aboutRoutes from "./routes/about.js";
// import citizenRoutes from "./routes/citizen.js";
// import officerRoutes from "./routes/officer.js";
// import adminRoutes from "./routes/admin.js";
// import paymentsRouter from "./routes/payments.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ========== EJS setup ==========
// app.set("view engine", "ejs");
// app.set("views", path.join(process.cwd(), "src/views"));

// // ========== Static Files ==========
// app.use(express.static(path.join(process.cwd(), "src/public")));

// // ========== Body Parsing ==========
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ========== Session Setup ==========
// const PgStore = pgSession(session);

// app.use(
//   session({
//     store: new PgStore({
//       pool: pool,          // PostgreSQL connection
//       tableName: "session" // session table in DB
//     }),
//     secret: process.env.SESSION_SECRET || "dev-secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 // 1 day
//     }
//   })
// );

// // ========== Middleware: Attach user to res.locals ==========
// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null; // always available in EJS
//   next();
// });

// // ========== Routes ==========
// app.use("/", routes);
// app.use("/services", servicesRoutes);
// app.use("/auth", authRoutes);
// app.use("/contact", contactRoutes);
// app.use("/about", aboutRoutes);
// app.use("/citizen", citizenRoutes);
// app.use("/officer", officerRoutes);
// app.use("/admin", adminRoutes);
// app.use("/payments", paymentsRouter);

// // serve uploaded files
// app.use('/uploads', express.static('uploads'));

// // ========== Start Server ==========
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });



// import express from "express";
// import path from "path";
// import session from "express-session";
// import pgSession from "connect-pg-simple";
// import pool from "./db.js"; // ES module
// import routes from "./routes/index.js";
// import servicesRoutes from "./routes/services.js";
// import authRoutes from "./routes/auth.js";
// import contactRoutes from "./routes/contact.js";
// import aboutRoutes from "./routes/about.js";
// import citizenRoutes from "./routes/citizen.js";
// import officerRoutes from "./routes/officer.js";
// import adminRoutes from "./routes/admin.js";
// import paymentsRouter from "./routes/payments.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // EJS setup
// app.set("view engine", "ejs");
// app.set("views", path.join(process.cwd(), "src/views"));

// // Static files
// app.use(express.static(path.join(process.cwd(), "src/public")));

// // Body parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Session
// const PgStore = pgSession(session);
// app.use(
//   session({
//     store: new PgStore({ pool, tableName: "session" }),
//     secret: process.env.SESSION_SECRET || "dev-secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   })
// );

// // Attach user
// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null;
//   next();
// });

// // Routes
// app.use("/", routes);
// app.use("/services", servicesRoutes);
// app.use("/auth", authRoutes);
// app.use("/contact", contactRoutes);
// app.use("/about", aboutRoutes);
// app.use("/citizen", citizenRoutes);
// app.use("/officer", officerRoutes);
// app.use("/admin", adminRoutes);
// app.use("/payments", paymentsRouter);

// // Uploads
// app.use("/uploads", express.static("uploads"));

// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });




// // ✅ Import Required Modules
// import express from "express";
// import path from "path";
// import session from "express-session";
// import pgSession from "connect-pg-simple";
// import dotenv from "dotenv";
// import pool from "./db.js";

// // ✅ Load environment variables (optional but recommended)
// dotenv.config();

// // ✅ Import Routes
// import routes from "./routes/index.js";
// import servicesRoutes from "./routes/services.js";
// import authRoutes from "./routes/auth.js";
// import contactRoutes from "./routes/contact.js";
// import aboutRoutes from "./routes/about.js";
// import citizenRoutes from "./routes/citizen.js";
// import officerRoutes from "./routes/officer.js";
// import adminRoutes from "./routes/admin.js";
// import paymentsRouter from "./routes/payments.js";

// // ✅ Initialize Express App
// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ EJS Template Engine Setup
// app.set("view engine", "ejs");
// app.set("views", path.join(process.cwd(), "src/views"));

// // ✅ Serve Static Files (CSS, JS, Images)
// app.use(express.static(path.join(process.cwd(), "src/public")));

// // ✅ Parse URL-encoded and JSON form data
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ✅ Setup Session Store in PostgreSQL
// const PgStore = pgSession(session);
// app.use(
//   session({
//     store: new PgStore({
//       pool, // PostgreSQL connection pool
//       tableName: "session", // Table for sessions
//     }),
//     secret: process.env.SESSION_SECRET || "dev-secret", // Secret key
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
//   })
// );

// // ✅ Make user session available in all EJS pages
// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null;
//   next();
// });

// // ✅ ROUTES
// app.use("/", routes);
// app.use("/services", servicesRoutes);
// app.use("/auth", authRoutes);
// app.use("/contact", contactRoutes);
// app.use("/about", aboutRoutes);
// app.use("/citizen", citizenRoutes);
// app.use("/officer", officerRoutes);
// app.use("/admin", adminRoutes);
// app.use("/payments", paymentsRouter);

// // ✅ Serve Uploaded Files (for user uploads)
// app.use("/uploads", express.static("uploads"));

// // ✅ 404 Page (optional)
// app.use((req, res) => {
//   res.status(404).render("error", { title: "404 - Page Not Found" });
// });

// // ✅ Global Error Handler (optional but recommended)
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.stack);
//   res.status(500).render("error", {
//     title: "Server Error",
//     message: "Something went wrong. Please try again later.",
//   });
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



// ✅ Import Required Modules
import express from "express";
import path from "path";
import session from "express-session";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";
import pool from "./db.js"; // Your PostgreSQL pool

// ✅ Load environment variables
dotenv.config();

// ✅ Import Routes
import routes from "./routes/index.js";
import servicesRoutes from "./routes/services.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import aboutRoutes from "./routes/about.js";
import citizenRoutes from "./routes/citizen.js";
import officerRoutes from "./routes/officer.js";
import adminRoutes from "./routes/admin.js";
import paymentsRouter from "./routes/payments.js";

// ✅ Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ EJS Template Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// ✅ Serve Static Files (CSS, JS, Images)
app.use(express.static(path.join(process.cwd(), "src/public")));

// ✅ Parse URL-encoded and JSON form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Setup Session Store in PostgreSQL
const PgStore = pgSession(session);
app.use(
  session({
    store: new PgStore({
      pool, // PostgreSQL connection pool
      tableName: "session", // Table for sessions
    }),
    secret: process.env.SESSION_SECRET || "dev-secret", // Secret key
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// ✅ Make user session available in all EJS pages
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ✅ ROUTES
app.use("/", routes);
app.use("/services", servicesRoutes);
app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/about", aboutRoutes);
app.use("/citizen", citizenRoutes);
app.use("/officer", officerRoutes);
app.use("/admin", adminRoutes);
app.use("/payments", paymentsRouter);

// ✅ Serve Uploaded Files (for user uploads)
app.use("/uploads", express.static("uploads"));

// ✅ 404 Page (when no route is matched)
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    message: "The page you are looking for does not exist.",
  });
});

// ✅ Global Error Handler (for unexpected server errors)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).render("error", {
    title: "Server Error",
    message: err.message || "Something went wrong. Please try again later.",
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
