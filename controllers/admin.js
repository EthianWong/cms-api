/**
 * Created by King on 2015/6/2.
 * Administrator Controllers
 */
(function(){

    "use strict";

    var Moment = require("moment");
    var _ = require('underscore');
    var Promise = require("bluebird");
    var Jwt = require('jsonwebtoken');

    var _AdminService = require('../services/admin');
    var Author_key = require('../private/author');
    var Render = require("../util/render");
    var Crypto = require("../util/crypto");

    /**
     * administrator login
     * @param { String }  request.body.name
     * @param { String }  request.body.password
     */
    module.exports.login = function(request, response, next){

        var paras = request.body;

        // Parameters validate
        if(!paras["name"] || !paras["password"])
        {
            Render.missParas("用户名密码不能为空").send(response);
            return false;
        }

        var AdminService = Promise.promisifyAll(_AdminService);

        // Name always is lower
        paras["name"] = paras["name"].replace(/\s+/g, '').toLowerCase();

        paras["password"] = Crypto.enCipher(paras["password"]);

        AdminService.findOneAsync(paras,{"password":0}).then(function(doc){

            if(doc){

                // Get last login time
                var last_login ={last_login:Moment(doc.last_login).format("YYYY-MM-DD HH:mm:ss")};

                // Update last login is now
                doc.last_login = Moment().format("YYYY-MM-DD HH:mm:ss");

                doc.save();

                // Change mongoose's document to javascript object
                var result = doc.toObject();

                // Set token's expires
                var expires = (new Date()).getTime();

                //10 minutes
                expires = expires + (10 * 60 * 1000);

                // Set token's property
                var user_token = {
                    token_uid:result._id,
                    token_isAllow:true,
                    token_expires:expires
                };

                // Create token
                var tokenVal = Jwt.sign(JSON.stringify(user_token),Author_key);

                tokenVal = {token:tokenVal};

                // Change result's last login
                result = _.extend(result ,last_login);

                // Extend token and user information
                var user_result = _.extend(result ,tokenVal);

                Render.success("登录成功",user_result).send(response);

            }else{

                Render.notFound("用户名密码错误").send(response);

            }
        }).catch(function(e){

            Render.exception(e).send(response);

        });
    };

}).call(this);