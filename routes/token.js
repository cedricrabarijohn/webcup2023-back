var express = require("express");
var router = express.Router();
const tokenController = require('../controller/TokenController')

router.get("/", tokenController.getToken)

module.exports = router;
