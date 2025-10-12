import pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER || "myuser",
  host: process.env.DB_HOST || "127.0.0.1",
  database: process.env.DB_NAME || "egov_db",
  password: process.env.DB_PASSWORD || "test123",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5433,
});

pool.on("connect", () => console.log("Connected to PostgreSQL"));
pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", err);
  process.exit(-1);
});

export default pool;
