var _                 = require('lodash');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var siu               = require('siu');
var constants         = require('../../../constants');

function error(config, current, addedRecord) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

  addedRecord = common(config, current, addedRecord, reducerName);

  var key = config.key;

  var rejectPredicate = function(record) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  };

  return config.store === constants.STORE_MUTABLE ?
    _.reject(current, rejectPredicate) :
    siu.a.reject(current, rejectPredicate);
}

module.exports = error;
