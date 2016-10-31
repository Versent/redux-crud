var omit              = require('lodash.omit');
var find              = require('lodash.find');
var common            = require('../common');
var siu               = require('siu');
var constants         = require('../../../constants');
var mergeMutable      = require('../../utils/mergeMutable');
var fromJS            = require('immutable').fromJS;

function error(config, current, record) {
  // We don't want to rollback
  var reducerName = 'updateError';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  var key = config.key;
  var updatedId = record[key];

  switch(config.store) {
    case constants.STORE_MUTABLE:
      var updatedRecord = find(current, key, updatedId);
      return updatedRecord ?
        mergeMutable(current, omit(updatedRecord, 'busy'), key) :
        current;
    case constants.STORE_IMMUTABLE:
      var updatedRecord = find(current, key, updatedId);
      return updatedRecord ?
        fromJS(mergeMutable(current, omit(updatedRecord, 'busy'), key)) :
        fromJS(current);
    default:
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
