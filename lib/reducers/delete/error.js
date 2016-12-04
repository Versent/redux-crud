var common            = require('../common');
var constants         = require('../../../constants');
var findByKey         = require('../../utils/findByKey');
var mergeMutable      = require('../../utils/mergeMutable');
var omit              = require('lodash.omit');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];
  var deleteRecord = findByKey(current, key, deleteId);
  deleteRecord = omit(deleteRecord, 'deleted', 'busy');

  return mergeMutable(current, deleteRecord, key);
}

module.exports = error;
