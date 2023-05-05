const mongoose = require('mongoose')

const HistoriqueAchatSchema = new mongoose.Schema({
    id_user:{
        type : mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default : Date.now
    },
    montant: {
        type: Number,
        required: true
    },
    is_success: {
        type: Boolean,
        required: true
    }
},{collection:'historiqueAchat'})

const HistoriqueAchat = mongoose.model('historiqueAchat', HistoriqueAchatSchema);
module.exports = HistoriqueAchat;