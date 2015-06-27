/**
 * Created by King on 2015/6/2.
 * Create default administrator
 */
(function(){

    "use strict";

    var express = require('express');
    var moment = require("moment");
    var _ = require('underscore');
    var Promise = require("bluebird");

    var database = require('./conf/Database');
    var _Admin = require('./models/Admin')(database.connection);
    var _Plate = require('./models/Plate')(database.connection);
    var crypto = require("./util/Crypto");

    // Administrator entity
    var admin = {
        name:"kingwind",
        password:"123123"
    };

    // Administrator init
    var init_admin = function(){

        admin.password = crypto.enCipher(admin.password);

        var user = _.extend(admin,{last_login:moment().format("YYYY-MM-DD HH:mm:ss")});

        var Admin = Promise.promisifyAll(_Admin);

        Admin.findAsync({}).then(function(data){

            _.each(data,function(ele){
                ele.remove();
            });

        }).then(function(){

            return Admin.createAsync(user);

        }).then(function(data){

            console.log("管理员导入成功 ID: " + data._id);
            init_plate();

        }).catch(function(e){

            console.log(e);

        });

    };

    var init_plate = function(){

        var module = {
            zh_name:"默认分类",
            en_name:"default",
            isVisible:false,
            isDefault:true
        };

        var Plate = Promise.promisifyAll(_Plate);

        Plate.create(module,function(err,result){
            if(err){
                console.log(err);
            }else{
                console.log("默认板块添加成功");
                process.exit();
            }
        });
    };

    init_admin();


}).call(this);
