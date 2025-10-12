import { Router } from "express";

const router = Router();

// Homepage
router.get("/", (req, res) => {
  res.render("index", { title: "E-Gov Portal", user: req.session?.user || null });
});

// Services list page
router.get("/services", (req, res) => {
  res.render("services", { title: "Available Services", user: req.session?.user || null });
});

// Individual service forms
router.get("/services/passport", (req, res) => {
  res.render("services/passport", { title: "Passport Renewal", user: req.session?.user || null });
});

router.post("/services/passport", (req, res) => {
  const { fullname, dob, passportNumber, email } = req.body;

  // For now, just show confirmation
  res.send(`
    <h1>Application Submitted</h1>
    <p>Thank you, ${fullname}. Your passport renewal request has been received.</p>
    <a href="/services">Back to Services</a>
  `);
});

router.get("/services/id-update", (req, res) => {
  res.render("services/id-update", { title: "National ID Update", user: req.session?.user || null });
});

router.get("/services/license", (req, res) => {
  res.render("services/license", { title: "Business License", user: req.session?.user || null });
});

router.get("/services/land", (req, res) => {
  res.render("services/land", { title: "Land Registration", user: req.session?.user || null });
});

export default router;
