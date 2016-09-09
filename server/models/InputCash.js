var mongoose = require('mongoose');

var inputCashSchema = mongoose.Schema({
    inputDate: {type: 'Date'},
    source: {type: 'String'},
    organization: {type: 'ObjectId', ref: 'Organization'},
    member: {type: 'ObjectId', ref: 'User'},
    cash: {type: 'Number'}
});

mongoose.model('InputCash', inputCashSchema);
