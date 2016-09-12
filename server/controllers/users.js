var encryption = require('./../utilities/encryption'),
    User = require('mongoose').model('User'),
    extend = require('util')._extend,
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

exports.getUsers = getUsers;
exports.getUsersByOrganizationId = getUsersByOrganizationId;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;

function getUsers(req, res) {
    User.find({}, {password: false, salt: false})
    .populate('organization', 'name -_id')
    .populate('roles', 'name -_id')
    .exec(function(err, collection) {
        if (err) console.log('err: ' + err);
        res.send(collection);
    });
}

function getUsersByOrganizationId(req, res) {
    if (req.params.organizationId === undefined) {
        console.log('Undefined organization id');
        res.end();
    }
    User.find({organization: ObjectId(req.params.organizationId)}, {password: false, salt: false})
    .exec(function(err, collection) {
        if (err) console.log('Get users by organization error: ' + err);
        res.send(collection);
    });
}

function getUserById(req, res) {
    if (req.params.id === undefined) {
        console.log('Undefined user id');
        res.end();
    }
    User.findOne({_id: req.params.id}).exec(function(err, user) {
        if (err) {
            console.log('Get User by id. err: ' + err);
        }
        res.send(user);
    });
}

function createUser(req, res, next) {
    var userData = req.body;
    changeUserDataForSavingNewUser();

    User.create(userData, function(err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicated username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user, function(err) {
            if (err) {return next();}
            res.send(user);
        });
    });

    function changeUserDataForSavingNewUser() {
        userData.username = userData.username.toLowerCase();
        userData.salt = encryption.createSalt();
        userData.password = encryption.hashPwd(userData.salt, userData.password);
    }
}

function updateUser(req, res) {
    var updatedUser = req.body;

    User.findOne({_id: updatedUser._id}).exec(function(err, user) {
        if (err) {
            res.status(400);
            return res.send({reason: err.message.toString()});
        }
        if (updatedUser.newPassword) {
            updatedUser.salt = encryption.createSalt();
            updatedUser.password = encryption.hashPwd(updatedUser.salt, updatedUser.newPassword);
        }
        delete updatedUser.newPassword;
        user = extend(user, updatedUser);

        user.save(function(err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.message.toString()});
            }
            res.send(user);
        });
    });
}
