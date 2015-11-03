var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');
var ensureGetters     = require('../../utils/ensureGetters');

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  record = common(config, current, record, reducerName);

  var deleteId = record[config.key];

  if (config.mutable) {
    ensureGetters(current, config);
    var deleteIndex = current.getIndex(deleteId);
    var currentHead = current.slice(0, deleteIndex);
    var newCurrent = currentHead.concat(current.slice(deleteIndex + 1));
    return ensureGetters(newCurrent, config);
  } else {
    return siu.a.reject(current, function(existingRecord) {
      return deleteId == existingRecord[config.key];
    });
  }
}

module.exports = success;
