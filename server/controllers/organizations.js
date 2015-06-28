var Organization = require('mongoose').model('Organization'),
    extend = require('util')._extend;

exports.getOrganizations = getOrganizations;
exports.getOrganizationById = getOrganizationById;
exports.createOrganization = createOrganization;
exports.updateOrganization = updateOrganization;

function getOrganizations(req, res) {
    Organization.find({}).exec(function(err, collection) {
        if (err) console.log('Get organizations. err: ' + err);
        res.send(collection);
    });
}

function getOrganizationById(req, res) {
    if (req.params.id === undefined) {
        console.log('Undefined organization id');
        res.end();
    }
    Organization.findOne({_id: req.params.id}).exec(function(err, organization) {
        if (err) {
            console.log('Get Organization by id. err: ' + err);
        }
        res.send(organization);
    });
}

function createOrganization(req, res) {
    var organizationData = req.body;

    Organization.create(organizationData, function(err, organization) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicated organization name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(organization);
    });
}

function updateOrganization(req, res) {
    var updatedOrganization = req.body;
    Organization.findOne({_id: updatedOrganization._id}).exec(function(err, organization) {
        if (err) {
            res.status(400);
            return res.send({reason: err.message.toString()});
        }

        organization = extend(organization, updatedOrganization);
        organization.save(function(err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.message.toString()});
            }
            res.send(organization);
        });
    });
}
