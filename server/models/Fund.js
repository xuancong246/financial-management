var mongoose = require('mongoose');

var fundSchema = mongoose.Schema({
    name: {type: 'String', required: '{PATH} is required!', unique: true},
    description: {type: 'String'},
    isActive: {type: 'Boolean'}
});

mongoose.model('Fund', fundSchema);
