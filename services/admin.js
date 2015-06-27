/**
 * Created by king on 2015/5/29.
 * Admin DAO
 */
(function(){

    "use strict";

    var Database = require('../conf/database');
    var Admin = require('../models/admin')(Database.connection);

    module.exports.login = function(params,callback){

        Admin.findOne(params,{"password":0},function(err,result){
            err ? callback(err, null) : callback(null, result);
        });
    };

}).call(this);
