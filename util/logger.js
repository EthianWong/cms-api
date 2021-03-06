/**
 * Created by King on 2015/6/18.
 * Save error log
 */
var moment = require("moment");
var fs =require("fs");
var path = require('path');

var Configs = require('../conf/configs');

module.exports = function(err,req){

    var error = {
        title: err.message,
        time : moment().format("YYYY-MM-DD HH:mm:ss"),
        location:{
            from:"",
            to:""
        },
        method:"",
        data:{
            post:"",
            get:""
        },
        stack: err.stack
    };

    if(req){

        error.location.from = req.headers.origin;
        error.location.to   = req.headers.host + req.url;
        error.method        = req.method;
        error.data.post     = JSON.stringify(req.body);
        error.data.get      = JSON.stringify(req.params);

    }

    error = JSON.stringify(error);

    var file_path = path.join(__dirname, Configs.log.path);
    var file_Name = Configs.log.name;

    fs.exists(file_path, function(exists){

        exists ? append() : createAndappend();

    });

    var createAndappend = function(){
        fs.mkdir(file_path, function(err){
            if(!err){fs.appendFile(file_path + file_Name, error)}
        });
    };

    var append = function(){
        fs.appendFile(file_path + file_Name, error);
    }
};