'use strict';
const auth = require('../auth');
const request = require("request");
const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

router.get('/', function (req, res, next) {
    if (req.session && req.session.token) {
        res.render('rules', {
            title: 'Rules',
            needAlert: false,
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/', function (req, res, next) {
    if (req.session && req.session.token) {
        var functionName = 'rules';
        var options = {
            url: auth.thingPlus.baseUri + functionName,
            auth: {
                bearer: req.session.token
            },
            json: true,
            method: req.method,
            body: req.body
        }
        options.body.trigger = JSON.parse(options.body.trigger);
        options.body.conditions = JSON.parse(options.body.conditions);
        options.body.actions = JSON.parse(options.body.actions);        
        request(options, function (error, message, body) {
            var success = true;
            if (error || body.statusCode != 201) {
                success = false;
            }
            res.render('rules', {
                title: 'Rules',
                needAlert: true,
                success: success
            });
            res.end();
        })

    } else {
        res.redirect('/login');
    }
});

module.exports = router;
