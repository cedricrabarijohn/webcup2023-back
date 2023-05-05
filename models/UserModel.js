const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
    role:{
        type:String,
        required:true
    },
    fonction:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    numero:{
        type:String,
        required:true
    },
    adresse:{
        type:String,
        required:true
    },
    estValide:{
        type:String,
        required:true,
    },
    ability:{
        type: [],
        required: true,
        default: []
    }
},{collection:'user'})

const User = mongoose.model('user', UserSchema);
module.exports = User;