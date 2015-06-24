/**
 * Created by dell on 2015/6/23.
 * router for upyun form api
 */
var express = require('express');
var router = express.Router();
var upload = require('../controllers/uploadCtrl');

router.post('/signature',upload.getSignature);

module.exports = router;