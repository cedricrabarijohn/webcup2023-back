var express = require('express');
var router = express.Router();

var factureController =  require('../controller/FactureController');

router.get('/', factureController.getFacture);

router.post('/add', factureController.addFacture);

module.exports = router;