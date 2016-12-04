var assign            = require('lodash.assign');
var common            = require('../common');
var constants         = require('../../../constants');
var findByKey         = require('../../utils/findByKey');
var mergeMutable      = require('../../utils/mergeMutable');

function start(config, current, record) {
  var reducerName = 'deleteStart';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];
  var recordStatus = {
    deleted: true,
    busy:    true,
  };
  var deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = assign({}, deleteRecord, recordStatus);

  return mergeMutable(current, deleteRecord, key);
}

module.exports = start;
