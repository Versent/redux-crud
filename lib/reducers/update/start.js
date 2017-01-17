var assign            = require('lodash.assign');
var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'updateSuccess';

  record = common(config, current, record, reducerName);

  // mark record as unsaved and busy
  var recordStatus = {
    busy:          true,
    pendingUpdate: true,
  };

  var newRecord = assign({}, record, recordStatus);

  // replace record
  return mergeMutable(current, newRecord, config.key);
}

module.exports = start;
