var express = require('express');
var router = express.Router();
var shopController =  require('../controller/ShopController');

router.get('/', shopController.getShops);
router.post('/add', shopController.addShops);



module.exports = router;