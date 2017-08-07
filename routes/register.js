const express = require('express');
const router = express.Router();

/* GET register page */
router.get('/', function (req, res, next) {
    res.redirect('https://thingplus.net/signup/');
});

module.exports = router;
