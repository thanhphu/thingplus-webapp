const express = require('express');
const loki = require('lokijs');
const session = require('../session');

var db = new loki("trains.db", {
  autoload: true,
  autoloadCallback: initDb,
  autosave: true,
  autosaveInterval: 4000
});
const router = express.Router();
const dbNames = {
  trains: "trains",
  cars: "cars",
};
var trains,
  cars;

// implement the autoloadback referenced in loki constructor
function initDb() {
  trains = db.getCollection(dbNames.trains);
  if (trains === null) {
    trains = db.addCollection(dbNames.trains);

    trains.insert({ _id: 1000, name: "신림-성수", cars: [2000, 2001, 2002] });
    trains.insert({ _id: 1002, name: "잠실-을지로3가" });
    trains.insert({ _id: 1004, name: "홍대입구-서울대입구" });
  }
  cars = db.getCollection(dbNames.cars);
  if (cars === null) {
    cars = db.addCollection(dbNames.cars);

    cars.insert({ _id: 2000, sensors: [1, 2, 3, 4], count: 0 });
    cars.insert({ _id: 2001, sensors: [5, 6, 7, 8], count: 0 });
    cars.insert({ _id: 2002, sensors: [9, 10, 11, 12], count: 0 });
  }
}

function isAuthorized(req) {
  if (req.session && req.session.token) {
    return true;
  }
  return false;
}

router.get('/', function (req, res, next) {
  // TODO Test function, redirect to home on completion
  res.sendStatus(200);
  res.send('OK');
  initDb();
  console.log('Cool ' + trains.count());
  res.end();
});

router.post('/trigger', function (req, res, next) {
  var result = cars.find({ 'sensors': { '$contains': req.params.sensorId } })
  if (result) {
    if (req.params.type === "IN") {
      result.count++;
      res.sendStatus(204);
      res.end();
      return;
    } else if (req.params.type === "OUT") {
      result.count--;
      res.sendStatus(204);
      res.end();
      return;
    }
  }
  res.sendStatus(403);
  res.end();
});

router.get('/sensors/:carId', function (req, res, next) {
  var result = cars.find({ '_id': carId })
  if (result) {
    res.setHeader('Content-Type', 'application/json');
    res.send(result.sensors);
    res.end();
    return;
  }
  res.sendStatus(403);
  res.end();
  return;
});

router.get('/sensor/:sensorid', function (req, res, next) {
});

router.post('/sensor', function (req, res, next) {
});

router.get('/train', function (req, res, next) {
});

router.get('/train/:trainid', function (req, res, next) {
});

router.post('/train', function (req, res, next) {
});

router.put('/train', function (req, res, next) {
});

module.exports = router;
