var express = require('express');
var router = express.Router();

var ArticleController = require('../controllers/article');
//var Authorization = require('../middleware/authorization');

router.post('/',ArticleController.create);

router.put('/:id',ArticleController.update);

router.get('/:_id',ArticleController.findOne);

router.get('/',ArticleController.query);

router.delete('/:_id',ArticleController.remove);

module.exports = router;