/*jshint devel: true, node: true, bitwise: false, camelcase: true, curly: true,
 eqeqeq: true, forin: true, freeze: true, immed: true, newcap: true,
 noarg: true, noempty: true, nonbsp: false, nonew: true, plusplus: true,
 quotmark: single, undef: true, unused: vars, strict: true, trailing: true,
 white: true, onevar: true, indent: 2, maxparams: 3, maxdepth: 3, maxlen: 80 */

'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var locationSchema = new Schema({
  BlockNo: { type: String },
  StreetDir: { type: String },
  Street: { type: String },
  City: { type: String },
  State: { type: String },
  Zip: { type: String },
  Zone: { type: String },
  Neighborhood: { type: String },
  loc: { type: Number, index: '2dsphere'}
});

var location = Mongoose.model('location', locationSchema);

module.exports = {
  Location: location
};
