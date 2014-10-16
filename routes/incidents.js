/*jshint devel: true, node: true, bitwise: false, camelcase: true, curly: true,
 eqeqeq: true, forin: true, freeze: true, immed: true, newcap: true,
 noarg: true, noempty: true, nonbsp: false, nonew: true, plusplus: true,
 quotmark: single, undef: true, unused: vars, strict: true, trailing: true,
 white: true, onevar: true, indent: 2, maxparams: 3, maxdepth: 3, maxlen: 80 */

'use strict';

var Boom = require('boom');
var Incident = require('../models/incident').Incident;

function getIncidents(request, reply) {
  Incident.find({}, function (err, incidents) {
    if (!err) {
      reply(incidents);
    } else {
      reply(Boom.badImplementation(err));
    }
  });
}

function searchIncidents(request, reply) {
  Incident.find({ loc : { $geoWithin : { $box : [ [parseFloat(request.params.left), parseFloat(request.params.bottom)],
                                                   [parseFloat(request.params.right), parseFloat(request.params.top)] ] } } }, function (err, incident) {
    if (incident) {
      reply(incident);
    } else if (err) {
      // Log it
      console.log(err);
      reply(Boom.notFound());
    } else {
      reply("Help");
    }
  });
}

function getIncidentsByCaseNumber(request, reply) {
  Incident.find({ CaseNo: request.params.CaseNo }, function (err, incident) {
    if (!err && incident) {
      reply(incident);
    } else if (err) {
      // Log it
      console.log(err);
      reply(Boom.notFound());
    } else {
      reply(Boom.notFound());
    }
  });
}

module.exports = exports = function (server) {

  console.log('Loading incident routes');
  exports.index(server);
  exports.showByCaseNumber(server);
  exports.searchIncidents(server);
};

/**
  * GET /incidents
  * Gets all the incidents from MongoDB and returns them
  *
  * @param server - The Hapi Server
  */
exports.index = function (server) {
  // GET /incidents
  server.route({
    method: 'GET',
    path: '/incidents',
    handler: getIncidents
  });
};

exports.searchIncidents = function (server) {
  server.route({
    method: 'GET',
    path: '/incidents/search',
    handler: searchIncidents
  });
};

exports.showByCaseNumber = function (server) {
  // GET /incidents/case_number/{case_number}
  server.route({
    method: 'GET',
    path: '/incidents/case_number/{CaseNo}',
    handler: getIncidentsByCaseNumber
  });
};

/**
  * Formats an error message that is returned from Mongoose.
  *
  * @param err The error object
  * @returns {string} The error message string.
  */
function getErrorMessageFrom (err) {
  var errorMessage = '';

  if (err.errors) {
    for (var prop in err.errors) {
      if (err.errors.hasOwnProperty(prop)) {
        errorMessage += err.errors[prop].message + ' '
      }
    }
  } else {
    errorMessage = err.Message;
  }
  return errorMessage;
}