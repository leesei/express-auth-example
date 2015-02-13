var bodyParser = require('body-parser');
var express = require("express");
var passport = require('passport');
var logger = require('./logger');

// setup a express server instance with authentication

// password checking done here
require('./passport-local.js');

// http://expressjs.com/api.html
var app = express();
app.disable('x-powered-by');

app.use(require('morgan')('tiny'));
app.use(require('compression')());
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'keyboard cat',
    key: 'id',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: null
    }
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated (req, res, next) {
  // logger.debug('req: %s', require('util').inspect(req));
  logger.debug('headers: %j', req.headers);
  logger.debug('cookies: %j', req.cookies);
  logger.debug('session: %j', req.session);
  logger.debug('user: %j', req.user);
  if (req.isAuthenticated()) { return next(); }
  res.status(403).json({ message: "require login" });
}


app.route('/login')
  .post(function(req, res, next) {
    // logger.debug('req: %s', require('util').inspect(req));
    logger.debug('headers: %j', req.headers);
    logger.debug('cookies: %j', req.cookies);
    logger.debug('session: %j', req.session);
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.status(403).json({
          message: info.message
        });
      }
      req.login(user, function(err) {
        if (err) { return next(err); }
        return res.json({ message: user.username + ' logged In' });
      });
    })(req, res, next);
  });

app.post('/logout', function(req, res){
  if (!req.isAuthenticated()) {
    res.json({ message: 'not logged in' });
    return;
  }

  var user = req.user;
  req.logout();
  res.json({ message: user.username + ' logged out!' });
});

module.exports = function (options) {
  // TODO: add options
  // options.session = options.session || {
  //   secret: 'keyboard cat',
  //   key: 'id'
  // };

  return {
    app: app,
    ensureAuthenticated: ensureAuthenticated
  };
};
