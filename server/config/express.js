var logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  session = require('express-session'),
  passport = require('passport');

module.exports = function(app, config) {
  app.set('views', config.viewsPath);
  app.set('view engine', 'jade');
  app.use(logger('dev'));
  app.use(cookieParser());
  app.use(bodyParser());
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(session({secret: 'financial unicorns'}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(config.staticPath));
};
