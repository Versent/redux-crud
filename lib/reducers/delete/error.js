var _                 = require('lodash');
var common            = require('../common');

function error(config, current, records) {
  var reducerName = 'deleteError';

  records = common(config, current, records, reducerName);

  var deleteIds = _.pluck(records, config.key);

  return current.map(function(record) {
    const deleted = _.includes(deleteIds, record[config.key]);
    if (deleted) return record.without('deleted').without('busy');
    return record;
  });
}

module.exports = error;
