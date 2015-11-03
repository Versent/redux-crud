var _                 = require('lodash');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');
var siu               = require('siu');
var ensureGetters     = require('../../utils/ensureGetters');

function error(config, current, addedRecord) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, addedRecord);

  addedRecord = common(config, current, addedRecord, reducerName);

  var key = config.key;

  if (config.mutable) {
    ensureGetters(current, config);
    var deleteId = addedRecord[key];
    var deleteIndex = current.getIndex(deleteId);
    var currentHead = current.slice(0, deleteIndex);
    var newCurrent = currentHead.concat(current.slice(deleteIndex + 1));
    return ensureGetters(newCurrent, config);
  } else {
    return siu.a.reject(current, function(record) {
      var recordKey = record[key];
      var isSameKey = addedRecord[key] === recordKey;
      return isSameKey;
    });
  }
}

module.exports = error;
