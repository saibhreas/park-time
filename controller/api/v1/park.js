const express = require("express");
const router = express.Router();
const db = require("../../../models");
const isAuthenticated = require("../../../config/middleware/isAuthenticated");

// [GET] /api/v1/park
router.get("/", isAuthenticated, function (req, res) {
    console.log("GET /api/v1/park");
    db.Park.findAll({
        where: {
            user_id: req.user.id
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log('There was an error retrieving Park entities: ', err);
            res.status(500).send(err);
        });
});

// [POST] /api/v1/park
router.post("/", isAuthenticated, function (req, res) {
    console.log("POST /api/v1/park: ", req.body);
    req.body.user_id = req.user.id;
    db.Park.create(req.body)
        .then(() => {
            console.log('Park stored successfully.');
            res.status(200).send('OK');
        })
        .catch((err) => {
            console.log('There was an error retrieving Park entities: ', err);
            res.status(500).send(err);
        });
});

module.exports = router;