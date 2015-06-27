/**
 * Created by dell on 2015/5/29.
 * Authorization
 */
var jwt = require('jsonwebtoken');
var connect = require('connect');

var Render = require("../util/Render");
var Author_key = require('../private/Author');

// validate authorization
var hasToken = function(request, res, next){

    var author = request.headers.authorization;

    if(author){
        try{

            request.tokenUser = jwt.verify(author, Author_key);
            console.log(request.tokenUser);
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
        next();
    }else{
        Render.allowExpire.send(res);
    }
};

var permission = connect().use(hasToken).use(isExpired);

module.exports =permission;