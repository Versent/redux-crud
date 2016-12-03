var reject            = require('lodash.reject');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var constants         = require('../../../constants');

function error(config, current, addedRecord) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

  addedRecord = common(config, current, addedRecord, reducerName);

  var key = config.key;

  function predicate(record) {
    var recordKey = record[key];
    var isSameKey = addedRecord[key] === recordKey;
    return isSameKey;
  }

  return reject(current, predicate);
}

module.exports = error;
