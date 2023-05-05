var express = require('express');
var router = express.Router();
var produitController =  require('../controller/ProduitController');
router.get('/', produitController.getProduits);
router.get('/:id', produitController.getProduitById);
router.post('/add', produitController.addProduits);
module.exports = router;