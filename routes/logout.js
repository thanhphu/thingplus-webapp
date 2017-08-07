const auth = require('../auth');
const express = require('express');
const querystring = require('querystring');
const session = require('../session');
const router = express.Router();

router.use(session);

/* GET login page */
router.get('/', function (req, res, next) {
    if (req.session && req.session.token) {
        req.session.token = "";
    }
    res.redirect('/');
});

module.exports = router;
