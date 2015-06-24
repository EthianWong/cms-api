/**
 * Created by dell on 2015/5/29.
 * 验证授权中间件
 */
var jwt = require('jsonwebtoken');
var connect = require('connect');

//结果处理
var render = require("../util/render");
var author_key = require('../private/author');

/*验证是否包含token*/
var hasToken = function(request, res, next){

    var author = request.headers.authorization;

    if(author){
        try{

            request.tokenUser = jwt.verify(author, author_key);
            console.log(request.tokenUser);
            next();

        }catch(e){
            render.notAllow.send(res);
        }

     }else{
        render.notAllow.send(res);
     }
};


/*token是否到期*/
var isExpired = function(request, res, next){
    var user = request.tokenUser;
    var date = new Date();
    var now = date.getTime();
    var expires = parseInt(user.token_expires);
    if(expires > now){
        next();
    }else{
        render.allowExpire.send(res);
    }
};

/*注册身份认证模块*/
var permission = connect().use(hasToken).use(isExpired);

module.exports =permission;