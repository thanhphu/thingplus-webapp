'use strict';
const auth = require('../auth');
const express = require('express');
const session = require('../session');
const request = require('request');
const router = express.Router();

router.use(session);

/* GET page */
router.get('/', function (req, res) {
  // Set up request
  var options = {
    url: auth.thingPlus.baseUri + '/gateways/{owner}/sensors/{id}',
    auth: {
      bearer: req.session.token
    },
    json: true,
    method: 'GET',
    body: ''
  };

  // Send request & redirect output
  request(options).pipe(res);
});

module.exports = router;
