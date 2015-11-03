var _                 = require('lodash');
var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');
var ensureGetters     = require('../../utils/ensureGetters');

function start(config, current, record) {
  var reducerName = 'deleteStart';

  record = common(config, current, record, reducerName);

  var deleteId = record[config.key];
  var recordStatus = {
    deleted: true,
    busy:    true,
  };

  if (config.mutable) {

    ensureGetters(current, config);
    var deleteRecord = current.get(deleteId);
    return mergeMutable(current, _.assign({}, deleteRecord, recordStatus), config.key);

  } else {

    return current.map(function(existingRecord) {
      if (existingRecord[config.key] == deleteId) {
        return existingRecord.merge(recordStatus);
      }

      return existingRecord;
    });
  }
}

module.exports = start;
