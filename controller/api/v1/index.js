const router = require('express').Router();
const authRoute = require("./userAuth");

// Routes for [/api/v1/auth/]
router.use('/auth', authRoute);

module.exports = router;