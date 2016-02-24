var _                 = require('lodash');
var siu               = require('siu');
var constants         = require('../../../constants');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var mergeMutable      = require('../../utils/mergeMutable');

function start(config, current, record) {
  var reducerName = 'createStart';
  assertNotArray(config, reducerName, record);

  record = common(config, current, record, reducerName);
  var recordStatus = {
    busy:          true,
    pendingCreate: true,
  };

  // mark record as unsaved and busy
  switch(config.store) {
    case constants.STORE_MUTABLE:
      return mergeMutable(current, _.assign({}, record, recordStatus), config.key);
    case constants.STORE_IMMUTABLE:
      var idx = current.findIndex(function(value) {
        return value.get(config.key) == record.get(config.key);
      });
      return current.push(record.merge(recordStatus));
    default:
      record = record.merge(recordStatus);
      return siu.a.merge(current, record, config.key);
  }

}

module.exports = start;
