var encryption = require('./../utilities/encryption'),
  User = require('mongoose').model('User');

exports.createUser = createUser;
exports.updateUser = updateUser;

function createUser(req, res, next) {
  var userData = req.body;
  changeUserDataForSavingNewUser();

  User.create(userData, function(err, user) {
    if (err) {
      if (err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicated Username');
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
  var user = req.body;
  console.log('congtest::' + req.user + "::" + user._id + '::' + user.password);
  if (req.user._id != user._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  }

  req.user.firstName = user.firstName;
  req.user.lastName = user.lastName;
  req.user.username = user.username;
  if (user.newPassword) {
    req.user.salt = encryption.createSalt();
    req.user.password = encryption.hashPwd(req.user.salt, user.newPassword);
  }

  req.user.save(function(err) {
    if (err) {res.status(400); return res.send({reason: err.toString()});}
    res.send(req.user);
  });
}
