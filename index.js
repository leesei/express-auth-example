#!/usr/bin/env node
var express = require("express");
var authExpress = require("./auth-express")();
var logger = require('./logger');

var app = authExpress.app;

app.route('/me')
  .all(authExpress.ensureAuthenticated)
  .get(function(req, res){
    var user = req.user;
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      message: "This is a very important message for " + user.username + "!!"
    });
  });

// /me2 as controller, this can be modulized
var Me = express.Router()
  .use(authExpress.ensureAuthenticated)
  .get('/', function(req, res){
    // clone user and delete password field
    // could have been util._extend() or _.clone()
    var user = JSON.parse(JSON.stringify(req.user));
    delete user.password;
    user.message = "This is another important message for " + user.username + "!!";
    res.json(user);
  });

app.use('/me2', Me);

// public API
app.route('/hello')
  .get(function(req, res){
    res.json({ message: "hello world" });
  });

app.use('/', express.static(__dirname + '/public'));

app.listen(3000);
logger.log('server on, listening on 3000');
