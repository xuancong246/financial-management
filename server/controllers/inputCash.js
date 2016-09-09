var InputCash = require('mongoose').model('InputCash'),
    extend = require('util')._extend;

exports.getInputCash = getInputCash;
exports.getInputCashById = getInputCashById;
exports.createInputCash = createInputCash;
exports.updateInputCash = updateInputCash;

function getInputCash(req, res) {
    InputCash.find({}).exec(function(err, collection) {
        if (err) console.log('Get input cash. Err: ' + err);
        res.send(collection);
    });
}

function getInputCashById(req, res) {
    //TODO chua xong
    if (req.params.id === undefined) {
        console.log('Undefined input cash id');
        res.end();
    }
    InputCash.findOne({_id: req.params.id}).exec(function(err, inputCash) {
        if (err) {
            console.log('Get input cash by id. Err: ' + err);
        }
        res.send(inputCash);
    });
}

function createInputCash(req, res) {
    var inputCashData = req.body;

    InputCash.create(inputCashData, function(err, fundSetting) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicated input cash');
            }
            res.status(400);
            return res.send({reason: err.toString()});
        }
        res.send(fundSetting);
    });
}

function updateInputCash(req, res) {
    var updateInputCash = req.body;
    console.log('congtest:' + JSON.stringify(updateInputCash));
    InputCash.findOne({_id: updateInputCash._id}).exec(function(err, inputCash) {
        if (err) {
            res.status(400);
            return res.send({reason: err.message.toString()});
        }

        inputCash = extend(inputCash, updateInputCash);
        inputCash.save(function(err) {
            if (err) {
                res.status(400);
                return res.send({reason: err.message.toString()});
            }
            res.send(inputCash);
        });
    });
}
