/**
 * Created by dell on 2015/6/25.
 */
(function(){

    "use strict";

    var mongoose = require('mongoose');

    var schema = mongoose.Schema({

        //标题
        title:String,
        //所属栏目
        plate_id : {
            type : mongoose.Schema.ObjectId,
            ref : 'plate'
        },
        //是否可见
        isVisible:{type:Boolean,default:1},
        //文章内容
        content:String,
        //封面地址
        cover_url:String,
        //是否为推荐贴
        isTop:{type:Boolean,default:0},
        //创建日期
        create_time:{type:Date,default:Date.now},
        //修改日期
        update_time:{type:Date,default:Date.now}

    },{versionKey:false});

    mongoose.model('article', schema);

    module.exports = function (connection) {
        return (connection || mongoose).model('article');
    }

}).call(this);