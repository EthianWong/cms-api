/**
 * Created by dell on 2015/6/3.
 * 文章类型-CURD
 */
(function(){

    "use strict";

    var database = require('../conf/database');
    var Plate = require('../models/plate')(database.connection);

    //添加类型
    //@paras : zh_name
    //@paras : en_name
    //@paras : isVisible
    module.exports.create = function(params,callback){

        Plate.create(params,function(err,result){
            err ? callback(err, null) : callback(null, result);
        });
    };

    module.exports.save = function(params,callback){

        Plate.findOneAndUpdate({_id:params._id},params,{new: true},function(err,result){
            err ? callback(err, null) : callback(null, result);
        });
    };

    var _query = function(params){

        var query = Plate.find({});

        if(params.isVisible){
            query.where('isVisible',params.isVisible);
        }

        if(params.name){
            var reg = new RegExp(params.name);
            query.find({"$or" : [ {"zh_name":reg} , {"en_name":reg} ] });
        }

        return query;
    };

    /*
    * 查询文章类型
    * @paras : name
    * @paras : isVisible
    * @paras : pageIndex
    * @paras : perPage
    * */
    module.exports.select = function(params,callback){

        var perPage = params["per-page"],pageIndex = params["page"] - 1;

        var query = _query(params);

        query.limit(perPage).skip(perPage * pageIndex).sort({'create_time':1});

        query.exec(function(err,result){
            err ? callback(err, null) : callback(null, result);
        })
    };

    module.exports.count = function(params,callback){

        var query = _query(params).count();

        query.exec(function(err,result){
            err ? callback(err, null) : callback(null, result);
        })
    };

}).call(this);