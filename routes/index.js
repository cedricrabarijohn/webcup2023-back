var express = require('express');
var router = express.Router();
// var axios = require('axios');
// var data = JSON.stringify({
//   "client_id": "2601f408-027d-4dc5-a538-f995bf4ee17d",
//   "client_secret": "a353ed73-c3cf-4c97-8135-13f4a1976cc1",
//   "grant_type": "client_credentials"
// });

// var config = {
//   method: 'post',
//   url: 'https://openapiuat.airtel.africa/auth/oauth2/token',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };
var JSEncrypt = require('node-jsencrypt')

var plaintext = '4321';
var pubilc_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkq3XbDI1s8Lu7SpUBP+bqOs/MC6PKWz6n/0UkqTiOZqKqaoZClI3BUDTrSIJsrN1Qx7ivBzsaAYfsB0CygSSWay4iyUcnMVEDrNVOJwtWvHxpyWJC5RfKBrweW9b8klFa/CfKRtkK730apy0Kxjg+7fF0tB4O3Ic9Gxuv4pFkbQIDAQAB";
var encrypt = new JSEncrypt();
encrypt.setPublicKey(pubilc_key);
var encrypted = encrypt.encrypt(plaintext); 
router.get('/', function(req, res, next) { 
    console.log(encrypted)
    // res.send('Bienvenu')
    res.json(encrypted)
});

module.exports = router;