var _            = require('lodash');
var wrapArray    = require('./wrapArray')

function ensureGetters (records, config) {
  if (!config.mutable || (records.get && records.getIndex)) return records;

  records = wrapArray(records);
  var recordMap = {};
  var indexMap = {};
  var key = config.key;

  _.forEach(records, function (record, index) {
    var recordKey = record[key];
    if (recordKey == null) throw new Error('Expected record to have ' + key);
    recordMap[recordKey] = record;
    indexMap[recordKey] = index;
  });

  records.get = function (recordId) {
    return recordMap[recordId]
  }

  records.getIndex = function (recordId) {
    return indexMap[recordId]
  }

  return records;
}

  module.exports = ensureGetters;
