'use strict';
const auth = require('../auth');
const querystring = require('querystring');

const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

/* GET login page */
router.get('/', function (req, res, next) {
    if (req.session && req.session.token) {
        res.redirect('/');
    } else {
        res.redirect(
            auth.thingPlus.authorizationUri + '?' +
            querystring.stringify({
                client_id: auth.thingPlus.clientId,
                response_type: 'code',
                redirect_uri: auth.thingPlus.redirectUri(req.headers.host)
            }));
    }
});

module.exports = router;
