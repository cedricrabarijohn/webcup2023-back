const mongoose = require('mongoose')

const CagnotteSchema = new mongoose.Schema({
    utilisateur:{
        type: {
            _id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            nom:{
                type:String,
                required:true
            },
            prenom:{
                type:String,
                required:true
            },
            profile:{
                type: String,
                required: true,
            },
        },
        required:true
    },
    montant:{
        type: Number,
        required: true,
        default: 0
    },
    titre:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    estValide:{
        type: Boolean,
        default: true
    }
},{collection:'cagnotte'})

const Cagnotte = mongoose.model('cagnotte', CagnotteSchema);
module.exports = Cagnotte;