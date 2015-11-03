var _                 = require('lodash');
var siu               = require('siu');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var mergeMutable      = require('../../utils/mergeMutable');
var ensureGetters     = require('../../utils/ensureGetters');

function start(config, current, record) {
  var reducerName = 'createStart';
  assertNotArray(config, reducerName, record);

  record = common(config, current, record, reducerName);
  var recordStatus = {
    busy:          true,
    pendingCreate: true,
  };

  // mark record as unsaved and busy
  if (config.mutable) {
    return mergeMutable(current, _.assign({}, record, recordStatus), config.key);
  } else {
    record = record.merge(recordStatus);
    return siu.a.merge(current, record, config.key);
  }
}

module.exports = start;
