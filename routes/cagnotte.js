var express = require('express');
var router = express.Router();

var cagnotteController =  require('../controller/CagnotteController');

router.get('/', cagnotteController.getCagnotte);

router.post('/add', cagnotteController.addCagnotte);

module.exports = router;