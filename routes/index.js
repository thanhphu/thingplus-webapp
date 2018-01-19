'use strict';
const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

function getUser(req) {
  if (req.session && req.session.token) {
    console.log('username=' + req.session.userName);
    return {
      token: req.session.token.substring(0,50),
      fullName: req.session.userName
    };
  } else {
    return null;
  }
}

/* GET home page. */
router.get('/', function (req, res) {
  console.log('Host ' + req.headers.host);
  res.render('index', {
    title: 'Hello!',
    host: req.headers.host,
    user: getUser(req),
    appName: 'subway-monitoring'
  });
});

module.exports = router;
