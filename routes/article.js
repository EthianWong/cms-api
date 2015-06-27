var express = require('express');
var router = express.Router();

var ArticleController = require('../controllers/article');
//var Authorization = require('../middleware/authorization');

router.post('/',ArticleController.create);

router.get('/:_id',ArticleController.findOne);

router.get('/',ArticleController.query);

module.exports = router;