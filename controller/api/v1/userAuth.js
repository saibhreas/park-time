const express = require("express");
const router = express.Router();
const db = require("../../../models");
const passport = require("../../../config/passport");
const { ValidationError } = require("sequelize");

// [POST] /api/v1/auth/signup
router.post("/signup", function (req, res) {
  console.log("POST /api/v1/auth/signup");
  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        // If user exists, throw error.
        res.status(500).json({ message: "This user already has an account!" });
      } else {
        // Create new user
        db.User.create(req.body)
          .then(() => {
            // Redirect to log in to be authenticated
            console.log(`redirected to api: /api/v1/auth/login `);
            // res.redirect("/login");
            res.redirect(307, "/api/v1/auth/login");
            // 307 means when you receive it send it back to us with
            // the same method with is post
          })
          .catch((err) => {
            if (err instanceof ValidationError) {
              // If error is for validation, then show just message
              res.status(500).json({ message: err.message });
            } else {
              res.status(500).json({ message: err });
            }
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

// [POST] /api/v1/auth/login
// auth kicks in, if it is succeeds it'll return the req.user
router.post(
  "/login",
  (req, res, next) => {
    console.log("POST api/v1/auth/login invoked");
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    console.log("POST /api/v1/auth/login", req.user);
    res.json(req.user);
  }
);

// [GET] /api/v1/auth/logout
router.get("/logout", function (req, res) {
  req.logout();
  res.sendStatus(200);
});

// *! must issue a get method using the url below to display user name
// [GET] /api/v1/auth/user_data
router.get("/user_data", function (req, res) {
  if (req.user) {
    res.json(req.user);
  }
  res.json({});
});

module.exports = router;
