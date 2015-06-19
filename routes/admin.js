var express = require('express');
var router = express.Router();

var adminCtrl = require('../controllers/adminCtrl');
var permission = require('../middlewares/PermissionValidate');

router.post('/login',adminCtrl.login);

module.exports = router;
