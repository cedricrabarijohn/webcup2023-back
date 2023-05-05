var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { res.send('Service client'); });

module.exports = router;