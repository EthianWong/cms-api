/**
 * Created by dell on 2015/6/2.
 * 后台管理员-模型
 */
(function(){

    "use strict";

    var mongoose = require('mongoose');

    var schema = mongoose.Schema({
        //用户名
        name:String,
        //密码
        password:String,
        //最后登录时间
        last_login:Date
    },{versionKey:false});

    mongoose.model('admin', schema);

    module.exports = function (connection) {
        return (connection || mongoose).model('admin');
    }

}).call(this);