const router = require('express').Router();

const apiRoutes = require('./v1');

// Routes for [/api/v1/]
router.use('/v1', apiRoutes);

module.exports = router;