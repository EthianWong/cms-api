/**
 * Created by dell on 2015/5/29.
 * Authorization
 */
var jwt = require('jsonwebtoken');
var connect = require('connect');

var Render = require("../util/render");
var Author_key = require('../private/author');
var Config = require("../conf/configs");

// validate authorization
var hasToken = function(request, res, next){

    var author = request.headers.authorization;

    if(author){
        try{

            request.tokenUser = jwt.verify(author, Author_key);
            next();

        }catch(e){
            Render.notAllow.send(res);
        }

     }else{
        Render.notAllow.send(res);
     }
};


// authorization expires
var isExpired = function(request, res, next){
    var user = request.tokenUser;
    var date = new Date();
    var now = date.getTime();
    var expires = parseInt(user.token_expires);

    if(expires > now){

        //  extend expires times
        user.token_expires = ((new Date()).getTime())+ (Config.expires * 60 * 1000);
        var authorization = jwt.sign(JSON.stringify(user),Author_key);
        res.setHeader("X-Authorization", authorization);
        next();

    }else{

        Render.allowExpire.send(res);

    }
};
var permission = connect().use(hasToken).use(isExpired);

module.exports =permission;