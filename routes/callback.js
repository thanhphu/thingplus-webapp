var auth = require('../auth');
const querystring = require('querystring');
var http = require("https");
var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function (req, response, next) {
    var http = require("https");

    var options = {
        "method": "POST",
        "hostname": "api.sandbox.thingplus.net",
        "port": null,
        "path": "/v2/oauth2/token",
        "headers": {
            "content-type": "application/json"
        }
    };

    var req = http.request(options, function (eventHandler) {
        eventHandler.on("response", function (resp) {
            console.log(resp);
        });
    });

    req.write(querystring.stringify({
        code: req.query.code,
        client_id: auth.thingPlus.clientId,
        client_secret: auth.thingPlus.clientSecret,
        redirect_uri: auth.thingPlus.redirectUri,
        grant_type: 'authorization_code'
    }));
    req.end();
});

module.exports = router;
