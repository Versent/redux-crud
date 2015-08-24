var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  record = common(config, current, record, reducerName);

  var deleteId = record[config.key];

  return siu.a.reject(current, function(existingRecord) {
    return deleteId == existingRecord[config.key];
  });
}

module.exports = success;
