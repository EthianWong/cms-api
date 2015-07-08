/**
 * Created by dell on 2015/7/8.
 */
(function(){

    var _ = require('underscore');

    module.exports = {
        "omit":function(data,keys){

            var self = {};
            self = _.extend(self,data);

            _.each(keys,function(key){

                if(_.has(self,key)){
                    delete self[key];
                }

            });

            return self;
        }
    };

}).call(this);