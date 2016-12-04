var reject            = require('lodash.reject');
var common            = require('../common');
var constants         = require('../../../constants');

function success(config, current, record) {
  var reducerName = 'deleteSuccess';

  record = common(config, current, record, reducerName);

  var key = config.key;
  var deleteId = record[key];

  function predicate(existingRecord) {
    return deleteId == existingRecord[key];
  };
  
  return reject(current, predicate);
}

module.exports = success;
