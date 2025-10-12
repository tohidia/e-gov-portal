// // src/db.js
// import pkg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();
// const { Pool } = pkg;
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// export default pool;

// import pg from "pg";

// const pool = new pg.Pool({
//   user: process.env.DB_USER || "admin",
//   host: process.env.DB_HOST || "localhost",
//   database: process.env.DB_NAME || "egov_portal",
//   password: process.env.DB_PASS || "password",
//   port: process.env.DB_PORT || 5432,
// });

// pool.on("connect", () => {
//   console.log("✅ Connected to PostgreSQL");
// });

// export default pool;



// import pg from "pg";

// const pool = new pg.Pool({
//   user: process.env.DB_USER || "faiza",
//   host: process.env.DB_HOST || "127.0.0.1",
//   database: process.env.DB_NAME || "egov_db",
//   password: process.env.DB_PASSWORD || "test123",
//   port: process.env.DB_PORT || 5433,
// });

// pool.on("connect", () => {
//   console.log(" Connected to PostgreSQL");
// });

// export default pool;


import pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER || "faiza",
  host: process.env.DB_HOST || "127.0.0.1",
  database: process.env.DB_NAME || "egov_db",
  password: process.env.DB_PASSWORD || "test123",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5433, // convert string to number
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", err);
  process.exit(-1);
});

export default pool;
