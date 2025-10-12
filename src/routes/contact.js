

// export default router;
import express from "express";
const router = express.Router();

// GET Contact page
router.get("/", (req, res) => {
  res.render("contact");
});

// POST Contact form
router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact Form:", name, email, message);
  res.render("contact", { success: "Your message has been sent!" });
});

export default router;

