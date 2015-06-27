var express = require('express');
var router = express.Router();

var UploadController = require('../controllers/Upload');

router.post('/signature',UploadController.getSignature);

module.exports = router;