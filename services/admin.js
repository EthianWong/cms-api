/**
 * Created by king on 2015/5/29.
 * Admin DAO
 */
(function(){

    "use strict";

    var Database = require('../conf/database');
    var Admin = require('../models/admin')(Database.connection);

    module.exports = Admin;

}).call(this);
