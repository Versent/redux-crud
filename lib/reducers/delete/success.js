// import siu           from 'siu';
var _ = require('lodash');

function success(resourcesName, current, deletedRecords) {
  if (!_.isArray(current))           throw new Error('Expected current to be an array');
  if (!_.isArray(deletedRecords))    throw new Error('Expected deletedRecords to be an array');

  // const deleteIds = _.pluck(deletedRecords, 'id');

  // return siu.a.reject(current, function(record) {
  //   return _.includes(deleteIds, record.id);
  // });

  return current;
}

module.exports = success;
