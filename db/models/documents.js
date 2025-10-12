// db/models/documents.js
const db = require('../connection');

async function addDocument({ request_id, filename, path, mime_type, uploaded_by }) {
  const q = `INSERT INTO documents (request_id, filename, path, mime_type, uploaded_by, uploaded_at) VALUES ($1,$2,$3,$4,$5,now()) RETURNING *`;
  const res = await db.query(q, [request_id, filename, path, mime_type, uploaded_by]);
  return res.rows[0];
}

async function getDocumentsByRequest(request_id) {
  const res = await db.query('SELECT * FROM documents WHERE request_id = $1 ORDER BY uploaded_at', [request_id]);
  return res.rows;
}

module.exports = { addDocument, getDocumentsByRequest };
