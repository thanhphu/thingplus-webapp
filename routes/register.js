var express = require('express');
var router = express.Router();

/* GET register page */
router.get('/', function (req, res, next) {
    res.render('page', {
        title: 'Register'
    });
});

module.exports = router;
