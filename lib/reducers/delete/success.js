var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];

  var rejectPredicate = function (existingRecord) {
    return deleteId == existingRecord[key];
  };

  return config.store === 'mutable' ?
    _.reject(current, rejectPredicate) :
    siu.a.reject(current, rejectPredicate);
}

module.exports = success;
