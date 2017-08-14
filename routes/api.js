const auth = require('../auth');
const express = require('express');
const loki = require('lokijs');
const request = require("request");
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
var trains, cars;

// implement the autoloadCallback referenced in loki constructor
function initDb() {
  trains = db.getCollection(dbNames.trains);
  if (trains === null) {
    trains = db.addCollection(dbNames.trains);

    trains.insert({ _id: 1000, name: "신림-성수", cars: [2000, 2001, 2002], isRunning: true });
    trains.insert({ _id: 1002, name: "잠실-을지로3가", cars: [], isRunning: false });
    trains.insert({ _id: 1004, name: "홍대입구-서울대입구", cars: [], isRunning: false });
  }
  cars = db.getCollection(dbNames.cars);
  if (cars === null) {
    cars = db.addCollection(dbNames.cars);

    cars.insert({ _id: 2000, sensors: [1, 2, 3, 4], count: 0 });
    cars.insert({ _id: 2001, sensors: [5, 6, 7, 8], count: 0 });
    cars.insert({ _id: 2002, sensors: [9, 10, 11, 12], count: 0 });
  }
}

initDb();

// TODO Enable on production
// Require authentication to call api
// router.all('*', function(req,res,next) {
//   if (req.session && req.session.token) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

router.get('/', function (req, res, next) {
  res.redirect('/');
});

// forward all requests to /api/forward to thing+
const forwardAddr = '/forward/';
router.all(forwardAddr + '*', function (req, res, next) {
  var functionName = req.url.substring(forwardAddr.length);
  var options = {
    url: auth.thingPlus.baseUri + functionName,
    auth: {
      bearer: req.session.token
    },
    json: true,
    method: req.method,
    body: req.body
  }
  request(options).pipe(res)
});

// Triggered when people going in or out of a car 
router.post('/trigger/:sensorId/:type', function (req, res, next) {
  var result = cars.find({ 'sensors': { '$contains': parseInt(req.params.sensorId, 10) } })
  if (result.length === 1) {
    if (req.params.type === "IN") {
      result[0].count++;
      res.status(204).end();
      return;
    } else if (req.params.type === "OUT") {
      if (result[0].count > 0) {
        result[0].count--;
      }
      res.status(204).end();
      return;
    }
  }
  res.sendStatus(400);
});

// Triggered when people going in or out of a car 
router.post('/trigger', function (req, res, next) {
  var result = cars.find({ 'sensors': { '$contains': parseInt(req.body.sensorId, 10) } })
  if (result.length === 1) {
    if (req.body.type === "IN") {
      result[0].count++;
      res.status(204).end();
      return;
    } else if (req.body.type === "OUT") {
      if (result[0].count > 0) {
        result[0].count--;
      }
      res.status(204).end();
      return;
    }
  }
  res.sendStatus(400);
});


// Query sensors inside a train car
router.get('/sensors/:carId', function (req, res, next) {
  var result = cars.find({ '_id': parseInt(req.params.carId, 10) })
  if (result.length === 1) {
    console.log(result);
    res.json(result[0].sensors);
    return;
  }
  res.sendStatus(400);
});

// edit sensor, move it to new car
router.post('/sensor', function (req, res, next) {
  deleteSensor(req, res, false);
  createSensor(req, res, true);
});

function createSensor(req, res, sendStatus) {
  var sensorId = parseInt(req.body.sensorId, 10);
  var carId = parseInt(req.body.carId, 10);

  var result = cars.find({ '_id': carId })
  var matchingSensor = cars.find({ 'sensors': { '$contains': sensorId } })
  if (result.length === 1 && matchingSensor.length === 0) {
    result[0].sensors.push(sensorId);
    if (sendStatus) {
      res.sendStatus(204);
    }
    return;
  }
  if (sendStatus) {
    res.sendStatus(400);
  }
}

// create new sensor
router.put('/sensor', function (req, res, next) {
  createSensor(req, res, true);
});

function deleteSensor(req, res, sendStatus) {
  var sensorId = parseInt(req.body.sensorId, 10);
  var matchingCar = cars.find({ 'sensors': { '$contains': sensorId } })

  if (matchingCar.length === 1) {
    var index = matchingCar[0].sensors.indexOf(sensorId);
    if (index > -1) {
      matchingCar[0].sensors.splice(index, 1);
      if (sendStatus) {
        res.sendStatus(204);
      }
      return;
    }
  }
  if (sendStatus) {
    res.sendStatus(400);
  }
}

// remove sensor
router.delete('/sensor', function (req, res, next) {
  deleteSensor(req, res, true);
});

// get car info, number of people inside a car
router.get('/cars/:carId', function (req, res, next) {
  var carId = parseInt(req.params.carId, 10);
  res.json(cars.find({ '_id': carId }));
});

// edit a car, move it to a different train
router.post('/car', function (req, res, next) {
  var carId = parseInt(req.body.carId, 10);
  var trainId = parseInt(req.body.trainId, 10);
  // TODO implement
});

// list trains
router.get('/trains', function (req, res, next) {
  res.json(trains);
});

// get a train, list cars in a train
router.get('/train/:trainId', function (req, res, next) {
  var trainId = parseInt(req.params.trainId, 10);
  var trainInfo = trains.find({ '_id': trainId });
  trainInfo.forEach((train) => {
    if (!train.cars) {
      train.cars = [];
    }
    train.counts = train.cars.map((carId) => {
      var foundCar = cars.find({ '_id': carId });
      return foundCar[0].count;
    });
  });
  res.json(trainInfo);
});

// edit a train's info
router.post('/train', function (req, res, next) {
  var trainId = parseInt(req.body.trainId, 10);
  var result = trains.find({ '_id': trainId });
  if (result.length === 1) {
    // Update attributes one by one
    var trainName = req.body.name;
    if (trainName) {
      result[0].name = trainName;
    }

    if (req.body.isRunning) {
      var isRunning = (req.body.isRunning == 'true');
      result[0].isRunning = isRunning;
    }

    res.sendStatus(204);
    return;
  }
  res.sendStatus(400);
});

// create a train
router.put('/train', function (req, res, next) {
  var trainId = parseInt(req.body.trainId, 10);
  var trainName = req.body.name;
  var isRunning = (req.body.isRunning == 'true');
  var cars = [];

  trains.push({
    _id: trainId,
    name: trainName,
    cars: cars,
    isRunning: isRunning
  });

  res.sendStatus(204);
});

module.exports = router;
