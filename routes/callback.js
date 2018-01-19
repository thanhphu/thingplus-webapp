'use strict';
const auth = require('../auth');
const express = require('express');
const http = require('https');
const request = require('request');
const session = require('../session');
const router = express.Router();

router.use(session);

function saveUserName(token, req, res) {
    var options = {
        url: auth.thingPlus.userUri,
        auth: {
            bearer: req.session.token
        },
        json:true,
    };
    request.get(options, function(error, mesage, body) {
        req.session.userName = body.data.loginId;
        req.session.save();
        res.redirect('/');
    });
}

/* GET callback page */
router.get('/', function (req, response) {
    var options = {
        'method': 'POST',
        'hostname': auth.thingPlus.apiHost,
        'port': null,
        'path': auth.thingPlus.accessTokenUri,
        'headers': {
            'content-type': 'application/json'
        }
    };

    var postRequest = http.request(options, function (res) {
        var chunks = [];

        res.on('data', function (chunk) {
            chunks.push(chunk);
        });

        res.on('end', function () {
            var body = Buffer.concat(chunks).toString();
            var json = JSON.parse(body);
            req.session.token = json.access_token;
            saveUserName(req.session.token, req, response);
            // response.redirect('/');
        });
    });

    postRequest.write(JSON.stringify({
        code: req.query.code,
        client_id: auth.thingPlus.clientId,
        client_secret: auth.thingPlus.clientSecret,
        redirect_uri: auth.thingPlus.redirectUri(req.headers.host),
        grant_type: 'authorization_code'
    }));
    postRequest.end();
});

module.exports = router;
