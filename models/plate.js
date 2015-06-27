/**
 * Created by dell on 2015/6/3.
 * Plate model
 */
(function(){

    "use strict";

    var mongoose = require('mongoose');

    var schema = mongoose.Schema({

        zh_name:String,
        en_name:String,
        order_id:{type:Number,default:0},
        isVisible:{type:Boolean,default:1},
        isDefault:{type:Boolean,default:0},
        create_time:{type:Date,default:Date.now}

    },{versionKey:false});

    mongoose.model('plate', schema);

    module.exports = function (connection) {
        return (connection || mongoose).model('plate');
    }

}).call(this);
