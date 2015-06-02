var mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
    name: {type: 'String', unique: true},
    description: {type: 'String'}
});

roleSchema.methods = {};
mongoose.model('Role', roleSchema);
