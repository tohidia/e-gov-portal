// // 

// // db/connection.js
// import pkg from 'pg';
// import dotenv from 'dotenv';
// dotenv.config();

// const { Pool } = pkg;

// const pool = new Pool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'egov_portal',
//   port: process.env.DB_PORT || 5432,
// });

// pool.connect()
//   .then(() => console.log('✅ Connected to PostgreSQL database successfully'))
//   .catch(err => console.error('❌ Database connection error:', err));

// export const query = (text, params) => pool.query(text, params);
// export { pool };



const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'egov_portal',
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch(err => console.error('❌ Database connection error:', err));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
