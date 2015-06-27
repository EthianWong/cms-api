var express = require('express');
var router = express.Router();

var PlateController = require('../controllers/Plate');
//var Authorization = require('../middleware/Authorization');

router.post('/update-sort',PlateController.updateSort);

router.put('/:id',PlateController.update);

router.post('/',PlateController.create);

router.get('/',PlateController.query);

module.exports = router;