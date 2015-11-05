var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var constants         = require('../../../constants');

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];

  var rejectPredicate = function (existingRecord) {
    return deleteId == existingRecord[key];
  };

  switch(config.store) {
    case constants.STORE_MUTABLE:
      return _.reject(current, rejectPredicate);
    default:
      return siu.a.reject(current, rejectPredicate);
  }

}

module.exports = success;
