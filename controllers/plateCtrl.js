/**
 * Created by dell on 2015/6/3.
 * 文章类型-控制器
 */
(function(){

    "use strict";

    var _plateMgr = require('../manager/plateMgr');
    var Promise = require("bluebird");
    var _ = require('underscore');

    //结果处理
    var render = require("../util/render");

    var plateMgr = Promise.promisifyAll(_plateMgr);


    //添加类型
    module.exports.create = function(request, response){

        var paras = request.body;

        //判断参数是否存在
        if(!paras["zh_name"] || !paras["en_name"] || paras["isVisible"] === undefined){

            render.missParas("中文、英文名称与是否可见必须填写").send(response);
        }else{

            //添加栏目类型
            plateMgr.createAsync(paras).then(function(data){

                render.success("添加成功",data).send(response);

            }).catch(function(e){

                render.exception(e).send(response);

            });
        }
    };

    //显示文章类型
    module.exports.query = function(request, response){

        var paras = request.query;

        var default_options = {
            "per-page":10000,
            "page":1
        };

        paras = _.extend(default_options,paras);

        var total = 0;

        //流程控制 先查询符合条件的数据总数 再返回分页数据
        plateMgr.countAsync(paras).then(function(count){

            total = count;

        }).then(function(){

            return plateMgr.selectAsync(paras);

        }).then(function(data){

            render.data(data,total).send(response);

        }).catch(function(e){

            render.exception(e).send(response);

        });

    };

    //修改文章类型
    module.exports.update = function(request, response){

        var paras = request.body;


        //判断参数是否存在
        if(!paras["zh_name"] || !paras["en_name"] || paras["isVisible"] === undefined){

            render.missParas("中文、英文名称与是否可见必须填写").send(response);

        }else{

            //修改栏目类型
            plateMgr.saveAsync(paras).then(function(data){

                render.success("修改成功",data).send(response);

            }).catch(function(e){

                render.exception(e).send(response);

            });

        }
    };

    //更新文章排序
    module.exports.updateSort = function(request, response){

        var plates = request.body;

        var arr = [];

        _.each(plates,function(ele,index,list){

            //把promise添加到arr中 形成promise队列
            arr.push(plateMgr.saveAsync(ele));

        });

        Promise.all(arr).then(function(){

            render.success("修改成功").send(response);

        }).catch(function(e){

            render.exception(e).send(response);

        });

    };



}).call(this);