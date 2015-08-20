// import siu           from 'siu';
var _ = require('lodash');
// import log           from 'loglevel';

function error(resourcesName, current, createdRecords) {
  // log.debug('handleCreated', createdRecords);
  var createdRecordIds = _.pluck(createdRecords, 'id');

  // return siu.a.reject(current, function(record) {
  //   return _.include(createdRecordIds, record.id);
  // });
  return current;
}

module.exports = error;
