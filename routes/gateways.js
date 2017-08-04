const express = require('express');
const session = require('../session');
const router = express.Router();

router.use(session);

router.get('/', function (req, res, next) {
  var gateways = getGateways(req);
  if (gateways) {
    res.render('page', {
        title: 'Gateways',
        items: gateways
    });
  } else {
    res.redirect('/login');
  }
});

function getGateways(req) {
  if (req.session && req.session.token) {
    return [{
      href: '#',
      text: 'Gateway 1'
    }];
  } else {
    return null;
  }
}

module.exports = router;
