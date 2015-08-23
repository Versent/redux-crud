var _                 = require('lodash');
var common            = require('../common');

function error(resourcesName, current, records) {
  var reducerName = 'createError';
  
  // records = common(config, current, records, reducerName);

  // var createdRecordIds = _.pluck(records, 'id');

  // return siu.a.reject(current, function(record) {
  //   return _.include(createdRecordIds, record.id);
  // });
  return current;
}

module.exports = error;
