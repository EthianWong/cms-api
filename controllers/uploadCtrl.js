/**
 * Created by dell on 2015/6/23.
 * form api for upyun oss
 */
(function(){

    "use strict";
    var render = require("../util/render");
    var crypto = require('crypto');

    var form_api_secret = "VOd01zYYBj1hAOAAYZgHremfuvI=";

    module.exports.getSignature = function(req,res){

        var params = req.body;

        if(!params["policy"]){

            render.missParas("policy不能为空").send(res);
            return false;

        }

        var result = params["policy"] + '&' + form_api_secret;

        var md5 = crypto.createHash("md5");

        md5.update(result);

        result = md5.digest('hex');

        result = {"signature":result};

        render.success("生成成功",result).send(res);

    }

}).call(this);