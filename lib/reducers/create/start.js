var assign            = require('lodash.assign');
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

  var newRecord = assign({}, record, recordStatus);

  // mark record as unsaved and busy
  return mergeMutable(current, newRecord, config.key);
}

module.exports = start;
