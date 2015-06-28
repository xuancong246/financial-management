var mongoose = require('mongoose');
var organizationSchema = mongoose.Schema({
    name: {type: 'String', required: '{PATH} is required!', unique: true},
    address: {type: 'String'},
    description: {type: 'String'}
});

organizationSchema.methods = {};
mongoose.model('Organization', organizationSchema);
