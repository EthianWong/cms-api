/**
 * Created by dell on 2015/7/8.
 */
(function(){

    "use strict";

    var _ = require('underscore');

    var custom = {};

    /**
     * 通用分页查询 返回查询结果的query
     * @param { Function }  middleware 组合查询条件的函数
     * @param { Object }    params 查询条件
     * @param { Object }    sort 指定排序
     * @param { Array }     omitKeys 需要在middleware中model.find(keys)中排除的key
     */
    custom.select = function(middleware,params,sort,omitKeys){

        var limit = params["per-page"];

        var skip = limit * (params["page"] - 1);

        omitKeys = _.union(omitKeys, ["per-page","page"]);

        return middleware(params,omitKeys).limit(limit).skip(skip).sort(sort);
    };

    /**
     * 返回满足条件的数据总数
     * @param { Function }  middleware 组合查询条件的函数
     * @param { Object }    params 查询条件
     * @param { Array }     omitKeys 需要在middleware中model.find(keys)中排除的key
     * @param { Function }  callback 回调函数
     */
    custom.count = function(middleware,params,omitKeys,callback){

        omitKeys = _.union(omitKeys, ["per-page","page"]);

        var query = middleware(params,omitKeys).count();

        query.exec(function(err,result){
            err ? callback(err, null) : callback(null, result);
        })
    };

    module.exports = custom;

}).call(this);