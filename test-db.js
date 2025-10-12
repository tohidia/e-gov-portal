import pool from './db.js';

pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Error:', err);
  else console.log('PostgreSQL time:', res.rows[0]);
  pool.end();
});
