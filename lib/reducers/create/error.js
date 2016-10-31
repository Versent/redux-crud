var reject            = require('lodash.reject');
var fromJS            = require('immutable').fromJS;
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var siu               = require('siu');
var constants         = require('../../../constants');

function error(config, current, addedRecord) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

  addedRecord = common(config, current, addedRecord, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    addedRecord = addedRecord.toJS();
    current = current.toJS();
  }

  var key = config.key;

  function rejectFn(record) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  switch(config.store) {
    case constants.STORE_MUTABLE:
      return reject(current, rejectFn);
    case constants.STORE_IMMUTABLE:
      return fromJS(reject(current, rejectFn));
    default:
      return siu.a.reject(current, rejectFn);
  }

}

module.exports = error;
