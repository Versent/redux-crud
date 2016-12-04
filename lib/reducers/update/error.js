var common            = require('../common');
var constants         = require('../../../constants');
var findByKey         = require('../../utils/findByKey');
var mergeMutable      = require('../../utils/mergeMutable');
var omit              = require('lodash.omit');

function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var updatedId = record[key];
  var updatedRecord = findByKey(current, key, updatedId);

  if (updatedRecord) {
    updatedRecord = omit(updatedRecord, 'busy');
    return mergeMutable(current, updatedRecord, key);
  } else {
    return current;
  }
}

module.exports = error;
