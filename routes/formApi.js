/**
 * Created by dell on 2015/6/23.
 * router for upyun form api
 */
var express = require('express');
var router = express.Router();
var formApi = require('../controllers/formApiCtrl');

router.post('/signature',formApi.getSignature);

module.exports = router;