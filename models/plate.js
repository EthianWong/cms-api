/**
 * Created by dell on 2015/6/3.
 * 文章类型-模型
 */
(function(){

    "use strict";

    var mongoose = require('mongoose');

    var schema = mongoose.Schema({

        //中文名
        zh_name:String,
        //英文名
        en_name:String,
        //显示顺序
        order_id:{type:Number,default:0},
        //是否可见
        isVisible:{type:Boolean,default:1},
        //是否为默认板块
        isDefault:{type:Boolean,default:0},
        //创建日期
        create_time:{type:Date,default:Date.now}

    },{versionKey:false});

    mongoose.model('plate', schema);

    module.exports = function (connection) {
        return (connection || mongoose).model('plate');
    }

}).call(this);
