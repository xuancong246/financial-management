var mongoose = require('mongoose'),
    encryption = require('./../utilities/encryption');

var fundSettingSchema = mongoose.Schema({
    appliedOn: {type: 'Date'},
    organization: {type: 'ObjectId', ref: 'Organization'},
    settings: [{fund: {type: 'ObjectId', ref: 'Role'}, percentage: {type: 'Number'}}],
    isActive: {type: 'Boolean'}
});

mongoose.model('FundSetting', fundSettingSchema);
