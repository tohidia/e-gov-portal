// import express from "express";
// import pool from "../db.js";

// const router = express.Router();

// // Temporary services list
// const services = [
//   { id: 1, name: "Passport Renewal", fee: 50 },
//   { id: 2, name: "Driving License", fee: 40 },
//   { id: 3, name: "Birth Certificate", fee: 20 },
//   { id: 4, name: "National ID Update", fee: 25 },
//   { id: 5, name: "Loan Service", fee: 0 }
// ];

// // GET /services → main services page
// router.get("/", (req, res) => {
//   res.render("services/index", { title: "Available Services", services });
// });

// // GET /services/apply → show service application form
// router.get("/apply", (req, res) => {
//   res.render("services/apply", { title: "Apply for Service", services });
// });

// // POST /services/apply → handle service form submission
// router.post("/apply", async (req, res) => {
//   const { service_id, fullName, phone } = req.body;

//   if (!fullName || !service_id) {
//     return res.status(400).render("services/error", {
//       message: "Full Name and Service ID are required."
//     });
//   }

//   try {
//     const result = await pool.query(
//       "INSERT INTO service_requests (service_id, full_name, phone, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
//       [service_id, fullName, phone]
//     );

//     console.log("Inserted service request:", result.rows[0]);

//     res.render("services/success", {
//       message: `Your application for service ID ${service_id} has been submitted successfully!`
//     });
//   } catch (err) {
//     console.error("Error submitting service form:", err);
//     res.status(500).render("services/error", {
//       message: "Error submitting service form. Please try again."
//     });
//   }
// });

// // GET /services/lend → show loan request form
// router.get("/lend", (req, res) => {
//   res.render("services/lend", { title: "Loan Request" });
// });

// // POST /services/lend → handle loan form submission
// router.post("/lend", async (req, res) => {
//   try {
//     const { fullName, nationalId, phone, amount, purpose } = req.body;

//     console.log("Loan form data received:", req.body);

//     if (!fullName || !amount) {
//       return res.status(400).render("services/error", {
//         message: "Full Name and Amount are required."
//       });
//     }

//     // Convert amount to number
//     const amountNum = parseFloat(amount.toString().replace(",", "."));
//     if (isNaN(amountNum)) {
//       return res.status(400).render("services/error", {
//         message: "Amount must be a valid number."
//       });
//     }

//     const result = await pool.query(
//       "INSERT INTO loan_requests (full_name, national_id, phone, amount, purpose, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
//       [fullName, nationalId || "", phone || "", amountNum, purpose || ""]
//     );

//     console.log("Inserted loan request:", result.rows[0]);

//     res.render("services/success", {
//       message: "Your loan request has been submitted successfully!"
//     });
//   } catch (err) {
//     console.error("Error submitting loan form:", err);
//     res.status(500).render("services/error", {
//       message: "Error submitting loan form. Please try again."
//     });
//   }
// });

// // GET /services/id-update → show ID update form
// router.get("/id-update", (req, res) => {
//   res.render("services/id-update", { title: "Update National ID" });
// });

// // POST /services/id-update → handle ID update form submission
// router.post("/id-update", async (req, res) => {
//   try {
//     const { fullName, oldId, newInfo, phone } = req.body;

//     if (!fullName || !oldId || !newInfo) {
//       return res.status(400).render("services/error", {
//         message: "Full Name, Old ID, and New Info are required."
//       });
//     }

//     const result = await pool.query(
//       "INSERT INTO id_update_requests (full_name, old_id, new_info, phone, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
//       [fullName, oldId, newInfo, phone || ""]
//     );

//     console.log("Inserted ID update request:", result.rows[0]);

//     res.render("services/success", {
//       message: "Your ID update request has been submitted successfully!"
//     });
//   } catch (err) {
//     console.error("Error submitting ID update form:", err);
//     res.status(500).render("services/error", {
//       message: "Error submitting ID update form. Please try again."
//     });
//   }
// });

// export default router;


import express from "express";
const router = express.Router();

/**
 * 🛂 Passport Service Routes
 */

// ✅ GET - Show passport form
router.get("/passport", (req, res) => {
  try {
    res.render("services/passport", {
      title: "Passport Application",
      error: null,
      success: null,
      form: {},
    });
  } catch (err) {
    console.error("❌ Render Error:", err);
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to load Passport page.",
    });
  }
});

// ✅ POST - Handle form submission
router.post("/passport", async (req, res) => {
  const { fullname, dob, passportNumber, email, address, phone } = req.body;

  if (!fullname || !dob || !email || !address || !phone) {
    return res.render("services/passport", {
      title: "Passport Application",
      error: "⚠️ Please fill in all required fields.",
      success: null,
      form: req.body,
    });
  }

  try {
    console.log("✅ Passport Application Submitted:", req.body);

    // Simulate saving to DB
    res.render("services/passport", {
      title: "Passport Application",
      error: null,
      success: "✅ Your passport application has been submitted successfully!",
      form: {},
    });
  } catch (err) {
    console.error("❌ Error submitting passport form:", err);
    res.status(500).render("error", {
      title: "Error",
      message: "Error while submitting passport form.",
    });
  }
});

export default router;
