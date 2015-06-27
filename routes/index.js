var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json("It's work");
});

module.exports = router;
