const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    host: req.headers.host,
    token: testSession(req)
  });
});

function testSession(req) {
  if (req.session && req.session.token) {
    return req.session.token;
  } else {
    return 'Not logged in';
  }
}

module.exports = router;
