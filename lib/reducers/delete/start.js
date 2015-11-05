var _                 = require('lodash');
var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'deleteStart';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];
  var recordStatus = {
    deleted: true,
    busy:    true,
  };

  switch(config.store) {
    case constants.STORE_MUTABLE:
      var deleteRecord = _.find(current, key, deleteId);
      return mergeMutable(current, _.assign({}, deleteRecord, recordStatus), key);
    default:
      return current.map(function(existingRecord) {
        if (existingRecord[key] == deleteId) {
          return existingRecord.merge(recordStatus);
        }

        return existingRecord;
      });
  }

}

module.exports = start;
