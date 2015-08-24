var _                 = require('lodash');
var common            = require('../common');

function error(config, current, record) {
  var reducerName = 'deleteError';

  record = common(config, current, record, reducerName);

  var deleteId = record[config.key];

  return current.map(function(existingRecord) {
    if(existingRecord[config.key] == deleteId) {
      return existingRecord.without('deleted').without('busy');
    } else {
      return existingRecord;
    }
  });
}

module.exports = error;
