var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');

function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = common(config, current, record, reducerName);

  var updatedId = record[config.key];

  return current.map(function(existingRecord) {
    var existingId = existingRecord[config.key];
    if (updatedId == existingId) {
      return existingRecord.without('busy');
    } else {
      return existingRecord;
    }
  });
}

module.exports = error;
