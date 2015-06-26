/**
 * Created by dell on 2015/6/25.
 */
var express = require('express');
var router = express.Router();

var articleCtrl = require('../controllers/articleCtrl');
var permission = require('../middlewares/PermissionValidate');

router.post('/',articleCtrl.create);

router.get('/:_id',articleCtrl.findOne);

router.get('/',articleCtrl.query);

module.exports = router;