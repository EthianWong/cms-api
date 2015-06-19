/**
 * Created by dell on 2015/6/2.
 * 数据库通用连接，全站使用同一个dbConnection防止频繁打开关闭连接
 */
(function(){
    "use strict";

    var mongoose = require('mongoose');

    var connection = mongoose.createConnection("mongodb://localhost:27017/change");

    connection.on('error', function (err) {
        connection.close();
    });

    connection.on('close', function () {
        mongoose.createConnection("mongodb://localhost:27017/change");
    });

    exports.connection = connection

}).call(this);