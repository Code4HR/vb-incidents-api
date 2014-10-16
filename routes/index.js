/*jshint devel: true, node: true, bitwise: false, camelcase: true, curly: true,
 eqeqeq: true, forin: true, freeze: true, immed: true, newcap: true,
 noarg: true, noempty: true, nonbsp: false, nonew: true, plusplus: true,
 quotmark: single, undef: true, unused: vars, strict: true, trailing: true,
 white: true, onevar: true, indent: 2, maxparams: 3, maxdepth: 3, maxlen: 80 */

'use strict';

/**
  * Add your other routes below.
  * Each model might have a file that declares its
  * routes, such as the Inspections model.
  */

exports.init = function (server) {
  console.log('Loading routes');

  require('./incidents')(server);
};
