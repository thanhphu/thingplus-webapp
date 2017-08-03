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
        "hostname": "api.thingplus.net",
        "port": null,
        "path": "/v2/oauth2/token",
        "headers": {
            "content-type": "application/json"
        }
    };

    var postRequest = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            response.send(body.toString());
            response.end();            
        });
    });

    postRequest.write(JSON.stringify({
        code: req.query.code,
        client_id: auth.thingPlus.clientId,
        client_secret: auth.thingPlus.clientSecret,
        redirect_uri: auth.thingPlus.redirectUri,
        grant_type: 'authorization_code'
    }));
    postRequest.end();
});

module.exports = router;
