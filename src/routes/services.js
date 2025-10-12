// import express from "express";
// const router = express.Router();

// // GET /services
// router.get("/", (req, res) => {
//   res.render("services", { title: "Services" });
// });

// export default router;


// import express from "express";
// const router = express.Router();

// // GET /services
// router.get("/", (req, res) => {
//   res.render("services", { title: "Services" });
// });

// // GET /services/apply → show the form
// router.get("/apply", (req, res) => {
//   // In real case: fetch services from DB
//   const services = [
//     { id: 1, name: "Passport Renewal", fee: 50 },
//     { id: 2, name: "Driving License", fee: 40 },
//     { id: 3, name: "Birth Certificate", fee: 20 }
//   ];

//   res.render("service-apply", { services });
// });

// // POST /services/apply → handle submission
// router.post("/apply", (req, res) => {
//   const { service_id } = req.body;

//   console.log("Citizen applied for service:", service_id);

//   res.send(`Application submitted for service ID: ${service_id}`);
// });

// export default router;


// import express from "express";
// const router = express.Router();

// // Temporary service list (later we will replace this with DB query)
// const services = [
//   { id: 1, name: "Passport Renewal", fee: 50 },
//   { id: 2, name: "Driving License", fee: 40 },
//   { id: 3, name: "Birth Certificate", fee: 20 }
// ];

// // GET /services → main services page
// router.get("/", (req, res) => {
//   res.render("services", { title: "Services" });
// });

// // GET /services/apply → show the service application form
// router.get("/apply", (req, res) => {
//   res.render("service-apply", { services });
// });

// // POST /services/apply → handle the form submission
// router.post("/apply", (req, res) => {
//   const { service_id } = req.body;

//   console.log("Citizen applied for service:", service_id);

//   res.send(`✅ Your application has been submitted for service ID: ${service_id}`);
// });

// export default router;




import express from "express";
// import pool from "../../db.js"; // برای ذخیره در دیتابیس
const router = express.Router();
// import pool from "../../db.js";
import pool from "../db.js";



// 🔹 Temporary service list (در آینده می‌تونی از دیتابیس بگیری)
const services = [
  { id: 1, name: "Passport Renewal", fee: 50 },
  { id: 2, name: "Driving License", fee: 40 },
  { id: 3, name: "Birth Certificate", fee: 20 },
  { id: 4, name: "National ID Update", fee: 25 },
  { id: 5, name: "Lend (Loan Service)", fee: 0 }
];

// 🔹 GET /services → صفحه‌ی اصلی خدمات
router.get("/", (req, res) => {
  res.render("services/index", { title: "Available Services", services });
});

// 🔹 GET /services/apply → نمایش فرم انتخاب سرویس
router.get("/apply", (req, res) => {
  res.render("services/apply", { title: "Apply for Service", services });
});

// 🔹 POST /services/apply → هندل کردن ارسال فرم
router.post("/apply", async (req, res) => {
  const { service_id, fullName, phone } = req.body;

  try {
    // ذخیره در دیتابیس
    await pool.query(
      "INSERT INTO service_requests (service_id, full_name, phone, created_at) VALUES ($1, $2, $3, NOW())",
      [service_id, fullName, phone]
    );

    res.render("services/success", {
      message: `✅ Your application for service ID ${service_id} was submitted successfully!`,
    });
  } catch (err) {
    console.error("❌ Error submitting form:", err);
    res.status(500).render("services/error", {
      message: "Error submitting form. Please try again.",
    });
  }
});

// 🔹 GET /services/lend → نمایش فرم درخواست قرض
router.get("/lend", (req, res) => {
  res.render("services/lend", { title: "Loan Request" });
});

// 🔹 POST /services/lend → ثبت فرم قرض
router.post("/lend", async (req, res) => {
  try {
    const { fullName, nationalId, phone, amount, purpose } = req.body;

    await pool.query(
      "INSERT INTO loan_requests (full_name, national_id, phone, amount, purpose, created_at) VALUES ($1, $2, $3, $4, $5, NOW())",
      [fullName, nationalId, phone, amount, purpose]
    );

    res.render("services/success", {
      message: "Your loan request was submitted successfully!",
    });
  } catch (err) {
    console.error("❌ Error submitting loan form:", err);
    res.status(500).render("services/error", {
      message: "Error submitting loan form. Please try again.",
    });
  }
});

// 🔹 GET /services/id-update → نمایش فرم آپدیت ID
router.get("/id-update", (req, res) => {
  res.render("services/id-update", { title: "Update National ID" });
});

// 🔹 POST /services/id-update → ثبت فرم آپدیت ID
router.post("/id-update", async (req, res) => {
  try {
    const { fullName, oldId, newInfo, phone } = req.body;

    await pool.query(
      "INSERT INTO id_update_requests (full_name, old_id, new_info, phone, created_at) VALUES ($1, $2, $3, $4, NOW())",
      [fullName, oldId, newInfo, phone]
    );

    res.render("services/success", {
      message: "Your ID update request was submitted successfully!",
    });
  } catch (err) {
    console.error("❌ Error submitting ID update form:", err);
    res.status(500).render("services/error", {
      message: "Error submitting ID update form. Please try again.",
    });
  }
});

export default router;
