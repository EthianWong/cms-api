var express = require('express');
var router = express.Router();

var ArticleController = require('../controllers/Article');
//var Authorization = require('../middleware/Authorization');

router.post('/',ArticleController.create);

router.get('/:_id',ArticleController.findOne);

router.get('/',ArticleController.query);

module.exports = router;