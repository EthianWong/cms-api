var express = require('express');
var router = express.Router();

var AdminController = require('../controllers/Admin');
//var Authorization = require('../middleware/Authorization');

router.post('/login',AdminController.login);

module.exports = router;
