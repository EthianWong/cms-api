/**
 * Created by King on 2015/6/4.
 * Result output
 */
(function(){

    "use strict";

    var configs = require('../conf/configs');
    var logger = require('./logger');

    // Output JSON
    var writeJson = function(res,message,context){
        res.json({
            message:message,
            context:context
        });
    };

    // Common function to set header
    var headerError = function(res,code,msg){
        res.statusCode = code;
        res.statusMessage = msg;
    };

    /*
    * Create error action
    * */
    var failed = function(status,tips,message,context){
        return{
            send:function(res){
                headerError(res,status,tips);
                writeJson(res,message,context);
            }
        };
    };

    module.exports = {

        //action success
        success : function(message,context){
            return{
                send:function(res){
                    writeJson(res,message,context);
                }
            };
        },

        failed : failed,

        exception : function(e,isNotFound){
            return{
                send:function(res,req){

                    if(!isNotFound){
                        headerError(res,500,"Internal Server Error");
                    }else{
                        headerError(res,404);
                    }

                    var stack = e.stack;

                    if(!configs.isDeveloper){
                        logger(e,req);
                        stack = "";
                    }

                    writeJson(res, e.message, stack);

                    if(configs.isDeveloper){throw(e);}
                }
            };
        },

        //select result
        data : function(context,total,message){
            return{
                send:function(res){
                    res.setHeader('X-Pagination-Total-Count',total);
                    writeJson(res,message,context);
                }
            };
        },

        invalidInput : failed(400,"Invalid Input","缺少参数"),
        notData : failed(404,"Data Not Found","数据不存在"),
        notAllow : failed(405,"Method Not Allowed","无权限进行此操作"),
        allowExpire :failed(406,"Allow Expired","授权过期请重新登录"),
        serverError :failed(500,"Internal Server Error","操作失败,请重试或联系管理员"),

        missParas : function(message){
            return failed(400,"Invalid Input",message);
        },

        notFound : function (message) {
            return failed(404,"Data Not Found",message);
        }
    };

}).call(this);