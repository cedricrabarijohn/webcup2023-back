var express = require('express');
var router = express.Router();

var partenaireController =  require('../controller/PartenaireController');

router.get('/', partenaireController.getPartenaire);

router.post('/add', partenaireController.addPartenaire);

module.exports = router;