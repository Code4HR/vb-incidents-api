/*jshint devel: true, node: true, bitwise: false, camelcase: true, curly: true,
 eqeqeq: true, forin: true, freeze: true, immed: true, newcap: true,
 noarg: true, noempty: true, nonbsp: false, nonew: true, plusplus: true,
 quotmark: single, undef: true, unused: vars, strict: true, trailing: true,
 white: true, onevar: true, indent: 2, maxparams: 3, maxdepth: 3, maxlen: 80 */

'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var incidentSchema = new Schema({
  CaseNo: { type: String, required: true },
  Location: {
    BlockNo: String,
    StreetDir: String,
    Street: String,
    City: String,
    State: String,
    Zip: String,
    Zone: String,
    Neighborhood: String
  },
  ReportDate: { type: Date },
  LastKnownSecure: { type: Date },
  AtFound: { type: Date },
  ReportingOfficer: { type: String },
  Supervisor: { type: String },
  InvestigatingOfficer: { type: String },
  CaseStatus: { type: String },
  CaseStatusDate: { type: Date },
  DispositionStatus: { type: String },
  DispositionDate: { type: Date },
  Crimes: {
    Crime: {
      CrimeSeqNumber: Number,
      CrimeDescription: String,
      CrimeCode: String,
      AttemptedOrCompleted: String,
      Premise: String,
      HowLeftScene: String,
      Entry_Info: String,
      Exit_Info: String,
      Security_Type_Info: String,
      CriminalActivity_Info: {
        Activity: String
      },
      WeaponTools_Info: {
        Weapon: String
      },
      BiasMotivation: String,
    }
  },
  ModusOperandi: {
    MethodOfEntry: String,
    Trademarks: String
  },
  VictimsAndOthersInvolved: {
    Notes: String,
    Injuries: String
  },
  Properties: {
    Property: {
      Type: String,
      Statuses: String,
      Value: String,
      RecoveredValue: String,
      Quantity: Number,
      Unit: String,
      Description: {
        GeneralDesc: String,
        Make: String,
        Model: String,
        SerialNumber: String
      }
    },
    TotalStolenValue: String,
    TotalRecoveredValue: String,
    Note: String
  },
  Vehicles: {
    Note: String
  },
  geoJson: {
    type: [Number],
    index: '2dsphere'
  }
});

var incident = Mongoose.model('incident', incidentSchema);

module.exports = {
  Incident: incident
};
