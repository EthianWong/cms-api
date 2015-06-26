/**
 * Created by dell on 2015/6/25.
 */
(function(){

    "use strict";

    var render = require("../util/render");
    var _ = require('underscore');

    var _articleMgr = require('../manager/articleMgr');
    var Promise = require("bluebird");

    var articleMgr = Promise.promisifyAll(_articleMgr);


    //添加文章
    module.exports.create = function(request, response){

        var paras = request.body;

        if(!paras["title"] || !paras["content"] || !paras["cover_url"] || !paras["plate_id"]){

            render.missParas("缺少参数").send(response);
            return false;

        }

        articleMgr.addAsync(paras).then(function(doc){

            var result = doc.toObject();
            render.success("添加成功",result).send(response);

        }).catch(function(e){

            render.exception(e).send(response);

        });

    };

    //查找指定文章
    module.exports.findOne = function(request, response){

        var paras = request.params;

        if(!paras["_id"] ){

            render.missParas("缺少文章ID").send(response);
            return false;

        }

        articleMgr.findOneAsync(paras).then(function(doc){

            if(doc){

                var result = doc.toObject();
                render.success("查询成功",result).send(response);

            }
            else{

                render.notFound("文章不存在").send(response);

            }

        }).catch(function(e){

            render.exception(e).send(response);

        });

    };

    //按条件获取文章列表并分页
    module.exports.query = function(request, response){

        var paras = request.query;

        var total = 0;

        var default_options = {
            "per-page":10,
            "page":1
        };

        paras = _.extend(default_options,paras);

        //流程控制 先查询符合条件的数据总数 再返回分页数据
        articleMgr.countAsync(paras).then(function(count){

            total = count;

        }).then(function(){

            return articleMgr.selectAsync(paras);

        }).then(function(data){

            render.data(data,total).send(response);

        }).catch(function(e){

            render.exception(e).send(response);

        });

    }


}).call(this);