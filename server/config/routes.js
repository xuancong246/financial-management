var users = require('./../controllers/users'),
    roles = require('./../controllers/roles'),
    funds = require('./../controllers/funds'),
    fundSettings = require('./../controllers/fundSettings'),
    organizations = require('./../controllers/organizations'),
    authenticate = require('./authenticate');

module.exports = function(app, config) {
    app.get('/api/users', users.getUsers);
    app.get('/api/users/:id', users.getUserById);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/roles', roles.getRoles);
    app.get('/api/roles/:id', roles.getRoleById);
    app.post('/api/roles', roles.createRole);
    app.put('/api/roles', roles.updateRole);

    app.get('/api/funds', funds.getFunds);
    app.get('/api/funds/:id', funds.getFundById);
    app.post('/api/funds', funds.createFund);
    app.put('/api/funds', funds.updateFund);

    app.get('/api/fundSettings', fundSettings.getFundSettings);
    app.post('/api/fundSettings', fundSettings.createFundSetting);

    app.get('/api/organizations', organizations.getOrganizations);
    app.get('/api/organizations/:id', organizations.getOrganizationById);
    app.post('/api/organizations', organizations.createOrganization);
    app.put('/api/organizations', organizations.updateOrganization);

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
