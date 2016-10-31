var assign            = require('lodash.assign');
var find            = require('lodash.find');
var fromJS            = require('immutable').fromJS;
var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'deleteStart';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }
  
  var key = config.key;
  var deleteId = record[key];
  var recordStatus = {
    deleted: true,
    busy:    true,
  };

  switch(config.store) {
    case constants.STORE_MUTABLE:
      var deleteRecord = find(current, key, deleteId);
      return mergeMutable(current, assign({}, deleteRecord, recordStatus), key);
    case constants.STORE_IMMUTABLE:
      var deleteRecord = find(current, key, deleteId);
      return fromJS(mergeMutable(current, assign({}, deleteRecord, recordStatus), key));
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
