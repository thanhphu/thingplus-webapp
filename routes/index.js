const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("Host " + req.headers.host)
  res.render('index', {
    title: 'Hello!',
    host: req.headers.host,
    user: getUser(req)
  });
});

function getUser(req) {
  if (req.session && req.session.token) {
    return {
      token: req.session.token.substring(0,50),
      fullName: 'John Smith'
    };
  } else {
    return null;
  }
}

module.exports = router;
