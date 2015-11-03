var _                 = require('lodash');
var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];

  if (config.store === 'mutable') {
    var deleteRecord = _.find(current, key, deleteId);
    return mergeMutable(current, _.omit(deleteRecord, 'deleted', 'busy'), key);
  } else {
    return current.map(function(existingRecord) {
      if(existingRecord[key] == deleteId) {
        return existingRecord.without('deleted').without('busy');
      } else {
        return existingRecord;
      }
    });
  }
}

module.exports = error;
