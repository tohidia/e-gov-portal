// // routes/requests.js
// const express = require('express');
// const router = express.Router();
// const pool = require('../db'); // your PostgreSQL connection

// router.get('/', async (req, res) => {
//     try {
//         const { name, requestId, status, service, from, to } = req.query;

//         let query = `SELECT r.*, u.name as citizen_name, s.name as service_name
//                      FROM requests r
//                      JOIN users u ON r.user_id = u.id
//                      JOIN services s ON r.service_id = s.id
//                      WHERE 1=1`;
//         let params = [];

//         if (name) {
//             params.push(`%${name}%`);
//             query += ` AND u.name ILIKE $${params.length}`;
//         }
//         if (requestId) {
//             params.push(requestId);
//             query += ` AND r.id = $${params.length}`;
//         }
//         if (status) {
//             params.push(status);
//             query += ` AND r.status = $${params.length}`;
//         }
//         if (service) {
//             params.push(service);
//             query += ` AND s.name ILIKE $${params.length}`;
//         }
//         if (from) {
//             params.push(from);
//             query += ` AND r.created_at >= $${params.length}`;
//         }
//         if (to) {
//             params.push(to);
//             query += ` AND r.created_at <= $${params.length}`;
//         }

//         const results = await pool.query(query, params);
//         res.render('requests-dashboard', { requests: results.rows });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server Error");
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const pool = require('../db'); // your PostgreSQL connection

router.get('/', async (req, res) => {
    try {
        const user = req.session.user; // logged-in user info
        const { name, requestId, status, service, from, to } = req.query;

        let query = `
            SELECT r.*, u.name as citizen_name, s.name as service_name, d.name as department_name
            FROM requests r
            JOIN users u ON r.user_id = u.id
            JOIN services s ON r.service_id = s.id
            JOIN departments d ON s.department_id = d.id
            WHERE 1=1
        `;
        let params = [];

        // Filter by officer's department
        if (user.role === 'officer') {
            params.push(user.department_id); // make sure session has department_id
            query += ` AND d.id = $${params.length}`;
        }

        // Search & filter parameters
        if (name) { params.push(`%${name}%`); query += ` AND u.name ILIKE $${params.length}`; }
        if (requestId) { params.push(requestId); query += ` AND r.id = $${params.length}`; }
        if (status) { params.push(status); query += ` AND r.status = $${params.length}`; }
        if (service) { params.push(`%${service}%`); query += ` AND s.name ILIKE $${params.length}`; }
        if (from) { params.push(from); query += ` AND r.created_at >= $${params.length}`; }
        if (to) { params.push(to); query += ` AND r.created_at <= $${params.length}`; }

        const results = await pool.query(query, params);
        res.render('requests-dashboard', { requests: results.rows, query: req.query });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
