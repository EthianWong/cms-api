/**
 * Created by King on 2015/6/23.
 * oss api for upyun
 */
(function(){

    "use strict";

    var Crypto = require('crypto');

    var Render = require("../util/Render");
    var Oss_key = require('../private/Oss');

    /**
     * Create oss signature
     * @param { Object }  req.body.policy
     */
    module.exports.getSignature = function(req,res){

        var params = req.body;

        if(!params["policy"]){

            Render.missParas("policy不能为空").send(res);
            return false;

        }

        var result = params["policy"] + '&' + Oss_key;

        var md5 = Crypto.createHash("md5");

        md5.update(result);

        result = md5.digest('hex');

        result = {"signature":result};

        Render.success("生成成功",result).send(res);

    }

}).call(this);