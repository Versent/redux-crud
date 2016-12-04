var find              = require('lodash.find');
var omit              = require('lodash.omit');
var common            = require('../common');
var constants         = require('../../../constants');
var mergeMutable      = require('../../utils/mergeMutable');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];

  function predicate(record) {
    return record[key] === deleteId;
  }

  var deleteRecord = find(current, predicate);
  deleteRecord = omit(deleteRecord, 'deleted', 'busy');

  return mergeMutable(current, deleteRecord, key);
}

module.exports = error;
