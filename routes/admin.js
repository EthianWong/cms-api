var express = require('express');
var router = express.Router();

var AdminController = require('../controllers/admin');
//var Authorization = require('../middleware/authorization');

router.post('/login',AdminController.login);

module.exports = router;
