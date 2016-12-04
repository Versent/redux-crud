var assign            = require('lodash.assign');
var find              = require('lodash.find');
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

  function predicate(record) {
    return record[key] === deleteId;
  }

  var deleteRecord = find(current, predicate);
  deleteRecord = assign({}, deleteRecord, recordStatus);

  return mergeMutable(current, deleteRecord, key);
}

module.exports = start;
