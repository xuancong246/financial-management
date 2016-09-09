var FundSetting = require('mongoose').model('FundSetting'),
    extend = require('util')._extend;

exports.getFundSettings = getFundSettings;
exports.getFundById = getFundById;
exports.createFundSetting = createFundSetting;
exports.updateFund = updateFund;

function getFundSettings(req, res) {
    FundSetting.find({}).exec(function(err, collection) {
        if (err) console.log('Get fund settings. Err: ' + err);
        res.send(collection);
    });
}

function getFundById(req, res) {
    //TODO chua xong
    if (req.params.id === undefined) {
        console.log('Undefined fund id');
        res.end();
    }
    Fund.findOne({_id: req.params.id}).exec(function(err, fund) {
        if (err) {
            console.log('Get fund by id. Err: ' + err);
        }
        res.send(fund);
    });
}

function createFundSetting(req, res) {
    var fundSettingData = req.body;

    FundSetting.create(fundSettingData, function(err, fundSetting) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicated fund setting');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(fundSetting);
    });
}

function updateFund(req, res) {
    var updatedFund = req.body;
    console.log('congtest:' + JSON.stringify(updatedFund));
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
