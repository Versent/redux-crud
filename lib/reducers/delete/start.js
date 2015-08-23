var _                 = require('lodash');
var common            = require('../common');

function start(config, current, records) {
  var reducerName = 'deleteStart';

  records = common(config, current, records, reducerName);

  var deleteIds = _.pluck(records, config.key);

  return current.map(function(record) {
    const deleted = _.includes(deleteIds, record[config.key]);
    if (deleted) {
      return record.merge({
        deleted: true,
        busy:    true,
      });
    }

    return record;
  });
}

module.exports = start;
