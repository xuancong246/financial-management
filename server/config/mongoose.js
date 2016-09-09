var mongoose = require('mongoose');
require('./../models/User');
require('./../models/Role');
require('./../models/Fund');
require('./../models/FundSetting');
require('./../models/InputCash');
require('./../models/Organization');

module.exports = function(config) {
    mongoose.connect(config.db);
    var dbConn = mongoose.connection;
    dbConn.on('error', console.error.bind(console, 'DB connection error ...'));
    dbConn.once('open', function callback() {
        console.log('Financial database opened!');
    });
};
