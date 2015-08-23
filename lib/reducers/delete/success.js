var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');

function success(config, current, records) {
  var reducerName = 'deleteSuccess';

  records = common(config, current, records, reducerName);

  var deleteIds = _.pluck(records, config.key);

  return siu.a.reject(current, function(record) {
    return _.includes(deleteIds, record[config.key]);
  });
}

module.exports = success;
