var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');

function error(config, current, records) {
  // We don't want to rollback
  var reducerName = 'updateError';

  records = common(config, current, records, reducerName);

  var updatedIds = _.pluck(records, config.key);

  return current.map(function(record) {
    const included = _.includes(updatedIds, record[config.key]);
    if (included) return record.without('busy');
    return record;
  });
}

module.exports = error;
