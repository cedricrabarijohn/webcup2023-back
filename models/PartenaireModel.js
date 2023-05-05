const mongoose = require('mongoose')

const PartenaireSchema = new mongoose.Schema({
    nom:{
        type: String,
        required:true
    },
    emplacement: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    }
},{collection:'partenaire'})

const Partenaire = mongoose.model('partenaire', PartenaireSchema);
module.exports = Partenaire;