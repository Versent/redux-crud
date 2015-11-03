var _                 = require('lodash');
var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');
var ensureGetters     = require('../../utils/ensureGetters');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  var deleteId = record[config.key];

  if (config.mutable) {
    ensureGetters(current, config);
    var deleteRecord = current.get(deleteId);
    return mergeMutable(current, _.omit(deleteRecord, 'deleted', 'busy'), config.key);
  } else {
    return current.map(function(existingRecord) {
      if(existingRecord[config.key] == deleteId) {
        return existingRecord.without('deleted').without('busy');
      } else {
        return existingRecord;
      }
    });
  }
}

module.exports = error;
