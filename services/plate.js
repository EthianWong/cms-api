/**
 * Created by King on 2015/6/3.
 * Plate DAO
 */
(function(){

    "use strict";

    var Database = require('../conf/database');
    var Plate = require('../models/plate')(Database.connection);
    var util = require('../util/global');
    var global = require('./global');

    var middleware = function(params,omitKeys){

        var query = Plate.find(util.omit(params,omitKeys));

        if(params.name){
            var reg = new RegExp(params.name);
            query.find({"$or" : [ {"zh_name":reg} , {"en_name":reg} ] });
        }

        return query;
    };


    Plate.select = function(params,sort,omitKeys,callback){

        var query = global.select(middleware,params,sort,omitKeys);

        query.exec(function(err,result){
            err ? callback(err, null) : callback(null, result);
        })
    };

    Plate.count = function(params,omitKeys,callback){

        global.count(middleware,params,omitKeys,callback);
    };

    module.exports = Plate;

}).call(this);