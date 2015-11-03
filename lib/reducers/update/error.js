var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');

function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var updatedId = record[key];

  if (config.store === 'mutable') {
    var updatedRecord = _.find(current, key, updatedId);
    return updatedRecord ?
      mergeMutable(current, _.omit(updatedRecord, 'busy'), key) :
      current;
  } else {
    return current.map(function(existingRecord) {
      var existingId = existingRecord[key];
      if (updatedId == existingId) {
        return existingRecord.without('busy');
      } else {
        return existingRecord;
      }
    });
  }
}

module.exports = error;
