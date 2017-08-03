var auth = require('../auth');
const querystring = require('querystring');

var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function (req, res, next) {
    res.redirect(
        auth.thingPlus.authorizationUri + "?" +
        querystring.stringify({
            client_id: auth.thingPlus.clientId,
            response_type: 'code',
            redirect_uri: auth.thingPlus.redirectUri
        })
    )
});

module.exports = router;
