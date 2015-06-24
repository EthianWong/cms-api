/**
 * Created by dell on 2015/6/2.
 * 后台管理员-控制器
 */
(function(){

    "use strict";

    var moment = require("moment");
    var _ = require('underscore');
    var Promise = require("bluebird");
    var jwt = require('jsonwebtoken');

    var _adminMgr = require('../manager/adminMgr');
    var author_key = require('../private/author');
    var render = require("../util/render");
    var crypto = require("../util/crypto");

    module.exports.login = function(request, response, next){

        var paras = request.body;

        //判断参数是否存在
        if(!paras["name"] || !paras["password"])
        {
            render.missParas("用户名密码不能为空").send(response);
            return false;
        }

        var adminMgr = Promise.promisifyAll(_adminMgr);

        paras["name"] = paras["name"].replace(/\s+/g, '').toLowerCase();

        paras["password"] = crypto.enCipher(paras["password"]);

        adminMgr.loginAsync(paras).then(function(doc){

            if(doc){

                //获取最后一次登录的时间
                var last_login ={last_login:moment(doc.last_login).format("YYYY-MM-DD HH:mm:ss")};

                //获取当前时间作为最后登录时间
                doc.last_login = moment().format("YYYY-MM-DD HH:mm:ss");

                doc.save();

                //注意此处高能大坑
                //mongoose 查询返回的很像很像JSON但是自定义的document类型
                //document类型无法使用常用的对象操作方法
                var result = doc.toObject();

                //设置token过期时间
                var expires = (new Date()).getTime();
                expires = expires + (20 * 60 * 1000);

                //指定token包含的项
                var user_token = {
                    token_uid:result._id,
                    token_isAllow:true,
                    token_expires:expires
                };

                //生成token
                var tokenVal = jwt.sign(JSON.stringify(user_token),author_key);

                tokenVal = {token:tokenVal};

                //将一开始的保存的登录时间赋给result
                result = _.extend(result ,last_login);

                //将token与用户信息整合
                var user_result = _.extend(result ,tokenVal);

                render.success("登录成功",user_result).send(response);

            }else{

                render.notFound("用户名密码错误").send(response);

            }
        }).catch(function(e){

            render.exception(e).send(response);

        });
    };

}).call(this);