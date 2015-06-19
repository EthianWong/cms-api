/**
 * Created by dell on 2015/6/3.
 * 文章类型路由控制
 */
var express = require('express');
var router = express.Router();

var plateCtrl = require('../controllers/plateCtrl');
//var permission = require('../middlewares/PermissionValidate');

router.post('/update-sort',plateCtrl.updateSort);

router.put('/:id',plateCtrl.update);

router.post('/',plateCtrl.create);

router.get('/',plateCtrl.query);

module.exports = router;