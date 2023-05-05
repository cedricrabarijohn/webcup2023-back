const mongoose = require('mongoose')

const FactureSchema = new mongoose.Schema({
    partenaire:{
        type:{
            _id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            emplacement: {
                type: String,
                required: true
            },
            nom: {
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
        },
        required: true
    },
    raison:{
        type: String,
        required: true
    },
    montant: {
        type: Number,
        required: true
    }
},{collection:'facture'})

const Facture = mongoose.model('facture', FactureSchema);
module.exports = Facture;