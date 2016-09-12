var Fund = require('mongoose').model('Fund'),
    extend = require('util')._extend;

exports.getFunds = getFunds;
exports.getFundById = getFundById;
exports.createFund = createFund;
exports.updateFund = updateFund;

function getFunds(req, res) {
    Fund.find({}).exec(function(err, collection) {
        if (err) console.log('Get funds. err: ' + err);
        res.send(collection);
    });
}

function getFundById(req, res) {
    if (req.params.id === undefined) {
        console.log('Undefined fund id');
        res.end();
    }
    Fund.findOne({_id: req.params.id}).exec(function(err, fund) {
        if (err) {
            console.log('Get Fund by id. err: ' + err);
        }
        res.send(fund);
    });
}

function createFund(req, res) {
    var fundData = req.body;

    Fund.create(fundData, function(err, fund) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicated fund name');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(fund);
    });
}

function updateFund(req, res) {
    var updatedFund = req.body;
    Fund.findOne({_id: updatedFund._id}).exec(function(err, fund) {
        if (err) {
            res.status(400);
            return res.send({reason: err.message.toString()});
        }

        fund = extend(fund, updatedFund);
        fund.save(function(err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.message.toString()});
            }
            res.send(fund);
        });
    });
}
