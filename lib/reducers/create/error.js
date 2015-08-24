var _                 = require('lodash');
var common            = require('../common');
var assertNotArray    = require('../../utils/assertNotArray');

function error(config, current, record) {
  var reducerName = 'createError';
  assertNotArray(config, reducerName, record);
  
  // records = common(config, current, records, reducerName);

  // var createdRecordIds = _.pluck(records, 'id');

  // return siu.a.reject(current, function(record) {
  //   return _.include(createdRecordIds, record.id);
  // });
  return current;
}

module.exports = error;
