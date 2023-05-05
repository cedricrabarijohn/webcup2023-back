const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
},{collection:'shop'})

const Shop = mongoose.model('shop', ShopSchema);
module.exports = Shop;