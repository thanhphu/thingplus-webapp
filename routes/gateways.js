const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

router.get('/', function (req, res, next) {
  res.render('page', {
    title: 'Gateways',
    items: getGateways(req)
  });
});

function getGateways(req) {
  if (req.session && req.session.token) {
    return [{
      href: 'Gateway 1',
      text: 'Gateway 1'
    }];
  } else {
    return null;
  }
}

module.exports = router;
