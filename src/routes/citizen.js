
// // src/routes/citizen.js
// import express from "express";
// import Requests from "../db/models/requests.cjs"; // CommonJS model, still works
// import Services from "../db/models/services.js";

// const router = express.Router();

// // Middleware to ensure citizen is logged in
// function ensureCitizen(req, res, next) {
//   if (!req.session.user || req.session.user.role !== "citizen") {
//     return res.redirect("/auth/login");
//   }
//   next();
// }

// // GET /citizen/dashboard
// router.get("/dashboard", ensureCitizen, async (req, res) => {
//   try {
//     const user = req.session.user;

//     // Fetch requests from database
//     const myRequests = await Requests.findAllByCitizen(user.id);

//     // Format requests for dashboard
//     const requestsWithDetails = myRequests.map((r) => ({
//       ...r,
//       serviceName: r.service_name,
//       departmentName: r.department_name,
//       date: r.created_at.toISOString().split("T")[0],
//     }));

//     res.render("citizen-dashboard", { requests: requestsWithDetails });
//   } catch (err) {
//     console.error("❌ Error fetching requests:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // ✅ Export as ES module
// export default router;




// src/routes/citizen.js
import express from "express";
import { Requests } from "../../db/models/requests.js";  // db/models/requests.js
import { Services } from "../../db/models/services.js";  // db/models/services.js
// import pool from "../db.js";  // db.js در src/db.js
// import pool from "../../src/db.js";  // db.js در src/db.js

const router = express.Router();

// 🧩 Middleware to ensure the logged-in user is a citizen
function ensureCitizen(req, res, next) {
  if (!req.session.user || req.session.user.role !== "citizen") {
    return res.redirect("/auth/login");
  }
  next();
}

// 🏠 GET /citizen/dashboard
router.get("/dashboard", ensureCitizen, async (req, res) => {
  try {
    const user = req.session.user;

    // ✅ Fetch citizen’s requests
    const myRequests = await Requests.findAllByCitizen(user.id);

    // ✅ Format results for display
    const requestsWithDetails = myRequests.map((r) => ({
      ...r,
      serviceName: r.service_name || "Unknown Service",
      departmentName: r.department_name || "Unknown Department",
      date: r.created_at
        ? new Date(r.created_at).toISOString().split("T")[0]
        : "",
    }));

    // ✅ Render the dashboard view
    res.render("citizen-dashboard", {
      user,
      requests: requestsWithDetails,
      pageTitle: "My Requests",
    });
  } catch (err) {
    console.error("❌ Error fetching citizen requests:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 📝 GET /citizen/request/new — show new request form
router.get("/request/new", ensureCitizen, async (req, res) => {
  try {
    const services = await Services.findAll();
    res.render("citizen-request-form", {
      services,
      pageTitle: "Submit New Request",
    });
  } catch (err) {
    console.error("❌ Error loading new request form:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 📨 POST /citizen/request — submit a new service request
router.post("/request", ensureCitizen, async (req, res) => {
  try {
    const { service_id, note } = req.body;
    const citizen_id = req.session.user.id;

    await Requests.createRequest({
      citizen_id,
      service_id,
      note,
      status: "Submitted",
    });

    res.redirect("/citizen/dashboard");
  } catch (err) {
    console.error("❌ Error creating new request:", err);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Export ES Module router
export default router;
