'use strict';
const auth = require('../auth');
const request = require('request');
const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

router.get('/', function (req, res) {
    if (req.session && req.session.token) {
        res.render('gateways', {
            title: 'Gateways',
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/forward', function (req, res) {
    var options = {
        url: auth.thingPlus.gatewaysUri,
        auth: {
            bearer: req.session.token
        },
    };
    request.get(options).pipe(res);
});

module.exports = router;
