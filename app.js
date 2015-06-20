var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var admin = require('./routes/admin');
var plate = require('./routes/plate');
var render = require("./util/render");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/*允许跨域*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Pagination-Total-Count,X-Requested-With,content-type,Authorization");
    res.header("Access-Control-Expose-Headers", "X-Pagination-Total-Count");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});




app.use('/', routes);
app.use('/admin', admin);
app.use('/plate',plate);


app.use(function(req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    next(err);

});


app.use(function(err, req, res, next) {

    var isNotFound = err.status = 404 ? true : false;
    render.exception(err,isNotFound).send(res,req);

});


module.exports = app;