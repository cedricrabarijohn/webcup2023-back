const mongoose = require('mongoose')

const ProduitSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    prix:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default: ''
    },
    duree:{
        type: Number,
        required:true,
        default: 1
    },
},{collection:'produit'})

const Produit = mongoose.model('produit', ProduitSchema);
module.exports = Produit;