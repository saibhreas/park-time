const router = require('express').Router();
const authRoute = require("./userAuth");
const parkRoute = require("./park");

// Routes for [/api/v1/auth/]
router.use('/auth', authRoute);
router.use('/park', parkRoute);

module.exports = router;