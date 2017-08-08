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

function isAuthorized(req, res) {
  if (req.session && req.session.token) {
    return true;
  }
  res.sendStatus(401);
  return false;
}

router.get('/', function (req, res, next) {
  // TODO Test function, redirect to home on completion
  res.sendStatus(200);
  res.send('OK');
  initDb();
  console.log('Cool ' + trains.count());
});

router.post('/trigger', function (req, res, next) {
  // TODO Enable on production
  // if (!isAuthorized(req, res)) {
  //   return;
  // }
  var result = cars.find({ 'sensors': { '$contains': parseInt(req.params.sensorId, 10) } })
  if (result.length === 1) {
    if (req.params.type === "IN") {
      result.count++;
      res.status(204).end();
      return;
    } else if (req.params.type === "OUT") {
      result.count--;
      res.status(204).end();
      return;
    }
  }
  res.sendStatus(400);
});

router.get('/sensors/:carId', function (req, res, next) {
  var result = cars.find({ '_id': parseInt(req.params.carId, 10) })
  if (result.length === 1) {
    console.log(result);
    res.json(result[0].sensors);
    return;
  }
  res.sendStatus(400);
});

router.get('/sensor/:sensorId', function (req, res, next) {
  var result = cars.find({ 'sensors': { '$contains': parseInt(req.params.sensorId, 10) } })
  if (result.length === 1) {
    if (req.params.type === "in") {
      result.count++;
      res.status(204).end();
      return;
    } else if (req.params.type === "out") {
      result.count--;
      res.status(204).end();
      return;
    }
  }
  res.sendStatus(400);
});

router.post('/sensor', function (req, res, next) {
});

router.put('/sensor', function (req, res, next) {
});

router.get('/cars', function (req, res, next) {
  res.json(cars);
});

router.get('/trains', function (req, res, next) {
  res.json(trains);
});

router.get('/train/:trainid', function (req, res, next) {
});

router.post('/train', function (req, res, next) {
});

router.put('/train', function (req, res, next) {
});

module.exports = router;
