/**
 * Created by King on 2015/6/25.
 * Article DAO
 */
(function(){

    "use strict";

    var Database = require('../conf/database');
    var Article = require('../models/article')(Database.connection);

    var util = require('../util/global');
    var global = require('./global');

    var middleware = function(params,omitKeys){

        var query = Article.find(util.omit(params,omitKeys),{"content":0});

        if(params.title){
            var reg = new RegExp(params.title);
            query.find({"title":reg});
        }

        return query;
    };


    Article.select = function(params,sort,omitKeys,callback){

        var query = global.select(middleware,params,sort,omitKeys);

        query.populate('plate_id','_id zh_name en_name').exec(function(err,result){
            err ? callback(err, null) : callback(null, result);
        })
    };

    Article.findOneHavePlate = function(params,callback){

        Article.findOne(params).populate('plate_id').exec(function (err, result) {
            err ? callback(err, null) : callback(null, result);
        });
    };


    Article.count = function(params,omitKeys,callback){

        global.count(middleware,params,omitKeys,callback);
    };

    module.exports = Article;

}).call(this);