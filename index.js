/*jshint devel: true, node: true, bitwise: false, camelcase: true, curly: true,
 eqeqeq: true, forin: true, freeze: true, immed: true, newcap: true,
 noarg: true, noempty: true, nonbsp: false, nonew: true, plusplus: true,
 quotmark: single, undef: true, unused: vars, strict: true, trailing: true,
 white: true, onevar: true, indent: 2, maxparams: 3, maxdepth: 3, maxlen: 80 */


'use strict';

var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server('localhost', 8000);
var routes = require('./routes');
var Mongoose = require('mongoose');

// MongoDB Connection
Mongoose.connect('mongodb://127.0.0.1/incidentreports');

var rootHandler = function (request, reply) {
  reply({ message: "Welcome to City of Virginia Beach's Incidents Results API" });
};

// Set the root route
server.route({
  method: 'GET',
  path: '/',
  handler: rootHandler
});

routes.init(server);

server.pack.register(Good, function (err) {
  if (err) {
    throw err;
  }

  server.start(function () {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
