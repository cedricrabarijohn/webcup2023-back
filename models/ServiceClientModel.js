const mongoose = require('mongoose')

const ServiceClientSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        default: ''
    }
},{collection:'serviceClient'})

const ServiceClient = mongoose.model('serviceClient', ServiceClientSchema);
module.exports = ServiceClient;