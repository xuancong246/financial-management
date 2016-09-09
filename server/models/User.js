var mongoose = require('mongoose'),
    encryption = require('./../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: 'String', required: '{PATH} is required!', unique: true},
    email: {type: 'String', unique: true},
    password: {type: 'String', required: '{PATH} is required!'},
    firstName: {type: 'String', required: '{PATH} is required!'},
    lastName: {type: 'String', required: '{PATH} is required!'},
    salt: {type: 'String', required: '{PATH} is required!'},
    isActive: {type: 'Boolean'},
    organization: {type: 'ObjectId', ref: 'Organization'},
    roles: [{type: 'ObjectId', ref: 'Role'}]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.password;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};

mongoose.model('User', userSchema);
