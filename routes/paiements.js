var express = require('express');
var router = express.Router();
const paiementController = require('../controller/PaiementController')
const auth = require('../authentification/auth')

router.get('/', function(req, res, next) { res.send('Paiements'); });
router.post('/pay',auth, paiementController.pay)
router.get('/:id', paiementController.getPaiementDetails)
module.exports = router;