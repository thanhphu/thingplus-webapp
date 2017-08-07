const express = require('express');
const session = require('../session');
const router = express.Router();

function isAuthorized(req) {
  if (req.session && req.session.token) {
    return true;
  }
  return false;
}

router.get('/', function(req, res, next) {
  res.send('OK');
  res.end();
});

router.get('/trigger/:triggerid', function(req, res, next) {
});

router.post('/trigger', function(req, res, next) {
});

router.get('/sensor/:sensorid', function(req, res, next) {
});

router.post('/sensor', function(req, res, next) {
});

router.get('/train', function(req, res, next) {
});

router.get('/train/:trainid', function(req, res, next) {
});

router.post('/train', function(req, res, next) {
});

router.put('/train', function(req, res, next) {
});

module.exports = router;
