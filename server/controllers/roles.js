var Role = require('mongoose').model('Role');
exports.getRoles = getRoles;

function getRoles(req, res) {
    Role.find({}).exec(function(err, collection) {
        if (err) console.log('Get roles. err: ' + err);
        res.send(collection);
    });
}
