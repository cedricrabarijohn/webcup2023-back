var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
// const auth = require('../authentification/auth')
var panierController =  require('../controller/PanierController');
var Panier =  require('../models/PanierModel');
const auth = require('../authentification/auth')
// router.get('/', async function(req, res, next) { 
//     try {
//         const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true });
//         await client.connect();
//         const db = client.db("hiu");
//         const paniers = await db.collection("panier").find().toArray(); 
//         res.status(200).json(paniers);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erreur serveur' });
//     }
//     res.send('Bienvenu')
// });
router.get('/',auth, panierController.getUserPanier)

router.get('/validate',auth, panierController.validateUserPanier)

router.post('/add', panierController.addPanier);

module.exports = router;