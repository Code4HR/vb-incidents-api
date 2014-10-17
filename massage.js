/*jshint devel: true, node: true, bitwise: false, camelcase: true, curly: true,
 eqeqeq: true, forin: true, freeze: true, immed: true, newcap: true,
 noarg: true, noempty: true, nonbsp: false, nonew: true, plusplus: true,
 quotmark: single, undef: true, unused: vars, strict: true, trailing: true,
 white: true, onevar: true, indent: 2, maxparams: 3, maxdepth: 3, maxlen: 80 */

'use strict';

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var http = require('http');

// Connection URL

var url = 'mongodb://localhost:27017/incidentreports';

// Use connect method to connect to the Server

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server');

  var collection = db.collection('incidents');

  collection.find().toArray(function(err, incidents) {
    assert.equal(null, err);

    incidents.forEach(function (incident, index) {

      if (index !== 1) {
        return;
      }

      if (! incident.geoJson) {

        getGeoJson(incident.Location, function (geoJson) {

          collection.update({
            CaseNo: incident.CaseNo
          }, {
            $set: {
               geoJson: geoJson
            }
          }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log('Updated geoJson:', geoJson);
          });
        });

      } else {
        console.log(incident);
      }
    });
  });

  function getGeoJson(location, callback) {
    console.log('getGeoJson');

    var address =
      parseInt(location.BlockNo, 10) + ' ' + location.Street + ', ' +
      location.City + ', ' + location.State + ' ' + location.Zip;

    return forwardGeolocation(address, callback);
  }

  function forwardGeolocation(address, callback) {
    console.log('forwardGeolocation');

    var req = http.request(
      'http://heliosapi.homes.com/v1/location/geocode?api_key=1-hdca-B6CIa13hYOvKIzda3ucN3v&location=' + address, function (res) {

      if (res.statusCode !== 200) {
        console.log('error code: ' + res.statusCode);
        callback();
      }

      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        var json = JSON.parse(chunk);

        callback({
          type: 'Point',

          coordinates: [
            json.location.center.lon,
            json.location.center.lat
          ]
        });
      });

      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers.body));

      /*
        var location = json.location;

        return {
        searchType: location.searchType,
        city: location.city,
        state: location.state,
        zip: location.zip,
        formattedAddress: location.formattedAddress,
        center: getCenter(location.center),
        boundingBox: getBoundingBox(location.bbox),
        bingCenter: getCenter(location.bing_center),
        bingBoundingBox: getBoundingBox(location.bing_bbox),
        mongoCenter: getCenter(location.mongo_center),
        mongoBoundingBox: getBoundingBox(location.mongo_bbox)
        };

        function getCenter(obj) {

        if (! _.isObject(obj)) {
        return obj;
        }

        return {
        latitude: getNumber(obj.lat),
        longitude: getNumber(obj.lon)
        };
        }

        function getBoundingBox(obj) {

        if (typeof obj === 'object') {
        return obj;
        }

        return {
        minLatitude: getNumber(obj.lat[0]),
        maxLatitude: getNumber(obj.lat[1]),
        minLongitude: getNumber(obj.lon[0]),
        maxLongitude: getNumber(obj.lon[1])
        };
        }

        function getNumber(value) {

        if (typeof value === 'undefined') {
        return value;
        }

        return Number(value);
        }
      */
    });

    req.end();
  }
});
