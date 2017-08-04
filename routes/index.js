const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

/* GET home page. */
router.get('/', function (req, res, next) {
  var userObj = getUser(req);
  res.render('index', {
    title: 'Express',
    host: req.headers.host,
    user: getUser(req)
  });
});

function getUser(req) {
  if (req.session && req.session.token) {
    return {
      token: req.session.token,
      fullName: 'John Smith'
    };
  } else {
    return null;
  }
}

module.exports = router;
