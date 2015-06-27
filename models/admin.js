/**
 * Created by dell on 2015/6/2.
 * Administrator model
 */
(function(){

    "use strict";

    var mongoose = require('mongoose');

    var schema = mongoose.Schema({
        //login name
        name:String,
        //password
        password:String,
        //last login
        last_login:Date

    },{versionKey:false});

    mongoose.model('admin', schema);

    module.exports = function (connection) {
        return (connection || mongoose).model('admin');
    }

}).call(this);