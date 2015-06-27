/**
 * Created by dell on 2015/6/25.
 * Article model
 */
(function(){

    "use strict";

    var mongoose = require('mongoose');

    var schema = mongoose.Schema({

        title:String,
        // DbRef plate
        plate_id : {
            type : mongoose.Schema.ObjectId,
            ref : 'plate'
        },
        isVisible:{type:Boolean,default:1},
        content:String,
        //article cover
        cover_url:String,
        isTop:{type:Boolean,default:0},
        create_time:{type:Date,default:Date.now},
        update_time:{type:Date,default:Date.now}

    },{versionKey:false});

    mongoose.model('article', schema);

    module.exports = function (connection) {
        return (connection || mongoose).model('article');
    }

}).call(this);