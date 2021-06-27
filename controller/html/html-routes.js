const router = require('express').Router();
const path = require("path");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// GET all galleries for homepage
router.get("/", (req, res) => {
  console.log("GET /");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/where2go");
  }
  res.sendFile(path.join(__dirname, "../../public/signup.html"));
});

router.get("/login", (req, res) => {
  console.log("GET /login");
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/where2go");
  }
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/where2go", isAuthenticated, (req, res) => {
  console.log("GET /where2go");
  // console.trace();
  res.sendFile(path.join(__dirname, "../../public/where2go.html"));
});

module.exports = router;
