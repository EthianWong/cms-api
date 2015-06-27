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

        var total = 0;

        PlateService.countAsync(paras).then(function(count){

            total = count;

        }).then(function(){

            return PlateService.selectAsync(paras);

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

            PlateService.saveAsync(paras).then(function(data){

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

            //Create promise stream
            arr.push(PlateService.saveAsync(ele));

        });

        Promise.all(arr).then(function(){

            Render.success("修改成功").send(response);

        }).catch(function(e){

            Render.exception(e).send(response);

        });

    };



}).call(this);