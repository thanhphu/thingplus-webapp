'use strict';
const auth = require('../auth');
const express = require('express');
const router = express.Router();

/* GET register page */
router.get('/', function (req, res) {
    res.redirect(auth.thingPlus.signupUri);
});

module.exports = router;
