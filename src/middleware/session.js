// middleware/session.js
import session from "express-session";
import connectPg from "connect-pg-simple";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const PgSession = connectPg(session);

export const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || "super_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // ۲ ساعت
    secure: false, // اگر HTTPS داری true کن
  },
});
