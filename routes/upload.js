var express = require('express');
var router = express.Router();

var UploadController = require('../controllers/upload');

router.post('/signature',UploadController.getSignature);

module.exports = router;