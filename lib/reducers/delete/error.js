var _                 = require('lodash');
var fromJS            = require('immutable').fromJS;
var common            = require('../common');
var constants         = require('../../../constants');
var mergeMutable      = require('../../utils/mergeMutable');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  var key = config.key;
  var deleteId = record[key];

  switch(config.store) {
    case constants.STORE_MUTABLE:
      var deleteRecord = _.find(current, key, deleteId);
      return mergeMutable(current, _.omit(deleteRecord, 'deleted', 'busy'), key);
    case constants.STORE_IMMUTABLE:
      var deleteRecord = _.find(current, key, deleteId);
      return fromJS(mergeMutable(current, _.omit(deleteRecord, 'deleted', 'busy'), key));
    default:
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
