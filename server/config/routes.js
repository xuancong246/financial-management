var users = require('./../controllers/users'),
  authenticate = require('./authenticate');

module.exports = function(app, config) {
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);

  app.get('/partials/*', function(req, res) {
    res.render(config.partialsPath + '/' + req.params[0]);
  });

  app.post('/signin', authenticate.authenticate);
  app.post('/signout', function(req, res) {
    req.logout();
    res.end();
  });

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};
