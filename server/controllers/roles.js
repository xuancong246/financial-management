var Role = require('mongoose').model('Role'),
    extend = require('util')._extend;

exports.getRoles = getRoles;
exports.getRoleById = getRoleById;
exports.createRole = createRole;
exports.updateRole = updateRole;

function getRoles(req, res) {
    Role.find({}).exec(function(err, collection) {
        if (err) console.log('Get roles. err: ' + err);
        res.send(collection);
    });
}

function getRoleById(req, res) {
    if (req.params.id === undefined) {
        console.log('Undefined role id');
        res.end();
    }
    Role.findOne({_id: req.params.id}).exec(function(err, role) {
        if (err) {
            console.log('Get Role by id. err: ' + err);
        }
        res.send(role);
    });
}

function createRole(req, res) {
    var roleData = req.body;

    Role.create(roleData, function(err, role) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicated role name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(role);
    });
}

function updateRole(req, res) {
    var updatedRole = req.body;
    Role.findOne({_id: updatedRole._id}).exec(function(err, role) {
        if (err) {
            res.status(400);
            return res.send({reason: err.message.toString()});
        }

        role = extend(role, updatedRole);
        role.save(function(err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.message.toString()});
            }
            res.send(role);
        });
    });
}
