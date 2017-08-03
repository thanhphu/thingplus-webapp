var auth = require('../auth');

var express = require('express');
var router = express.Router();

/* GET login page */
router.get('/', function (req, res, next) {
    var token = auth.thingPlus.createToken('access token', 'optional refresh token', 'optional token type', { data: 'raw user data' })

    // Set the token TTL. 
    token.expiresIn(1234) // Seconds. 
    token.expiresIn(new Date('2016-11-08')) // Date. 

    // Refresh the users credentials and save the new access token and info. 
    token.refresh().then(storeNewToken)

    // Sign a standard HTTP request object, updating the URL with the access token 
    // or adding authorization headers, depending on token type. 
    token.sign({
        method: 'get',
        url: 'https://api.thingplus.net/v2/gateways'
    }) //=> { method, url, headers, ... } 

    res.send(auth.thingPlus);
    console.log(token);
    res.end();
});

module.exports = router;
