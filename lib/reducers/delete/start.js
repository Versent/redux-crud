var _                 = require('lodash');
var common            = require('../common');

function start(config, current, record) {
  var reducerName = 'deleteStart';

  record = common(config, current, record, reducerName);

  var deleteId = record[config.key];

  return current.map(function(existingRecord) {
    if (existingRecord[config.key] == deleteId) {
      return existingRecord.merge({
        deleted: true,
        busy:    true,
      });
    }

    return existingRecord;
  });
}

module.exports = start;
