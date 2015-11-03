var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');
var ensureGetters     = require('../../utils/ensureGetters');

function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = common(config, current, record, reducerName);

  var updatedId = record[config.key];

  if (config.mutable) {
    ensureGetters(current, config);
    var updatedRecord = current.get(updatedId);
    return mergeMutable(current, _.omit(updatedRecord, 'busy'), config.key);
  } else {
    return current.map(function(existingRecord) {
      var existingId = existingRecord[config.key];
      if (updatedId == existingId) {
        return existingRecord.without('busy');
      } else {
        return existingRecord;
      }
    });
  }
}

module.exports = error;
