/**
 * Created by King on 2015/6/4.
 * 结果处理
 */
(function(){

    "use strict";

    var configs = require('../conf/configs');
    var logger = require('./logger');

    //公共方法输出JSON
    var writeJson = function(res,message,context){
        res.json({
            message:message,
            context:context
        });
    };

    //公共方法设置错误头
    var headerError = function(res,code,msg){
        res.statusCode = code;
        res.statusMessage = msg;
    };

    /*
    * 生成操作失败的错误
    * JSON对象内部需要访问此方法 所以剥离作为公共方法
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

        //请求成功
        success : function(message,context){
            return{
                send:function(res){
                    writeJson(res,message,context);
                }
            };
        },

        //请求失败
        failed : failed,

        //异常捕捉
        exception : function(e,isNotFound){
            return{
                send:function(res,req){

                    if(!isNotFound){ headerError(res,500,"Internal Server Error") }

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

        //查询结果
        data : function(context,total,message){
            return{
                send:function(res){
                    res.setHeader('X-Pagination-Total-Count',total);
                    writeJson(res,message,context);
                }
            };
        },

        //预定义错误
        invalidInput : failed(400,"Invalid Input","缺少参数"),
        notData : failed(404,"Data Not Found","数据不存在"),
        notAllow : failed(405,"Method Not Allowed","无权限进行此操作"),
        allowExpire :failed(405,"Allow Expired","授权过期请重新登录"),
        serverError :failed(500,"Internal Server Error","操作失败,请重试或联系管理员"),

        //参数缺少错误
        missParas : function(message){
            return failed(400,"Invalid Input",message);
        },

        //未找到xxx错误
        notFound : function (message) {
            return failed(404,"Data Not Found",message);
        }
    };

}).call(this);