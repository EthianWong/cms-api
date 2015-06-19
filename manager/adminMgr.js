/**
 * Created by dell on 2015/5/29.
 * 管理员-CRUD逻辑
 */
(function(){

    "use strict";

    var database = require('../conf/database');
    var Admin = require('../models/admin')(database.connection);

    //登录
    //params : name , password
    module.exports.login = function(params,callback){

        Admin.findOne(params,{"password":0},function(err,result){
            err ? callback(err, null) : callback(null, result);
        });
    };

}).call(this);
