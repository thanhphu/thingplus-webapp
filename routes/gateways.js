const request = require("request");
const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

router.get('/', function (req, res, next) {
    var isSuccess = showGateways(req, res);
    if (!isSuccess) {
        res.redirect('/login');
    }
});

router.get('/token', function (req, res, next) {

});

function showGateways(req, res) {
    if (req.session && req.session.token) {
        var options = {
            url: 'https://api.thingplus.net/v2/gateways',
            auth: {
                bearer: req.session.token
            },
        }        
        request(options, function(error, response, body) {
            if (error) {
                return null;
            } else {
                var json = JSON.parse(body);
                var items = []
                json.data.forEach(function (element) {
                    items.push({
                        href: '#',
                        id: element.id,
                        text: element.name,
                        sensors: element.sensors
                    })
                });
                res.render('page', {
                    title: 'Gateways',
                    items: items
                });
            }
        });
    } else {
        return null;
    }
}

module.exports = router;
