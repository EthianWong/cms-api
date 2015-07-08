/**
 * Created by King on 2015/6/3.
 * Plate Controllers
 */
(function(){

    "use strict";

    var _PlateService = require('../services/plate');
    var Promise = require("bluebird");
    var _ = require('underscore');


    var Render = require("../util/render");
    var PlateService = Promise.promisifyAll(_PlateService);

    var _ArticleService = require('../services/article');
    var ArticleService = Promise.promisifyAll(_ArticleService);


    /**
     * Add plate
     * @param { String }  request.body.zh_name
     * @param { String }  request.body.en_name
     * @param { Boolean } request.body.isVisible
     */
    module.exports.create = function(request, response){

        var paras = request.body;

        // Parameters validate
        if(!paras["zh_name"] || !paras["en_name"] || paras["isVisible"] === undefined){

            Render.missParas("中文、英文名称与是否可见必须填写").send(response);
        }else{

            PlateService.createAsync(paras).then(function(data){

                Render.success("添加成功",data).send(response);

            }).catch(function(e){

                Render.exception(e).send(response);

            });
        }
    };

    /**
     * Get plate by condition
     * @param { String }  request.query.name
     * @param { Boolean } request.query.isVisible
     * @param { Number }  request.query.pageIndex
     * @param { Number }  request.query.perPage
     */
    module.exports.query = function(request, response){

        var paras = request.query;

        var default_options = {
            "per-page":10000,
            "page":1
        };

        paras = _.extend(default_options,paras);

        var omitKeys = ["name"];

        var total = 0;

        PlateService.countAsync(paras,omitKeys).then(function(count){

            total = count;

        }).then(function(){

            var sort = {'create_time':-1};
            return PlateService.selectAsync(paras,sort,omitKeys);

        }).then(function(data){

            Render.data(data,total).send(response);

        }).catch(function(e){

            Render.exception(e).send(response);

        });

    };

    /**
     * Update plate by _id
     * @see module.exports.create
     * @param { Number }  request.body._id
     */
    module.exports.update = function(request, response){

        var paras = request.body;


        if(!paras["zh_name"] || !paras["en_name"] || paras["isVisible"] === undefined){

            Render.missParas("中文、英文名称与是否可见必须填写").send(response);

        }else{

            var condition = {_id:paras._id};
            var model = paras;
            var options = {new:true};

            PlateService.updateAsync(condition,model,options).then(function(data){

                Render.success("修改成功",data).send(response);

            }).catch(function(e){

                Render.exception(e).send(response);

            });

        }
    };

    /**
     * Update plate display sort by _id
     * @see module.exports.update
     * @param { Number }  request.body._id
     */
    module.exports.updateSort = function(request, response){

        var plates = request.body;

        var arr = [];

        _.each(plates,function(ele,index,list){

            var condition = {_id:ele._id};
            var model = ele;
            var options = {new:true};

            //Create promise stream
            arr.push(PlateService.updateAsync(condition,model,options));

        });

        Promise.all(arr).then(function(){

            Render.success("修改成功").send(response);

        }).catch(function(e){

            Render.exception(e).send(response);

        });

    };


    /**
     * delete plate by id
     * @param { Number }  request.params._id
     */
    module.exports.remove = function(request, response){

        var params = request.params;

        if(!params["_id"]){

            Render.missParas("缺少ID").send(response);
            return false;

        }

        var delete_id = params["_id"];

        PlateService.findOneAsync({isDefault:true}).then(function(data){

            return data._id;

        }).then(function(id){

            var condition = {plate_id:delete_id};
            var model = {$set:{plate_id:id}};
            var options = {multi:true};

            return ArticleService.updateAsync(condition,model,options);

        }).then(function(){

            return PlateService.removeAsync({_id:delete_id});

        }).then(function(){

            Render.success("删除成功",{}).send(response);

        }).catch(function(e){

            Render.exception(e).send(response);

        });
    };


}).call(this);