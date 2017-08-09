const auth = require('../auth');
const request = require("request");
const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

router.get('/', function (req, res, next) {
    if (req.session && req.session.token) {
        res.render('trains', {
            title: 'Train management',
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
