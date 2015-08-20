var _ = require('lodash');

function error(resourcesName, current, deletedRecords) {
  // log.debug('error');
  if (!_.isArray(current))        throw new Error('Expected current to be an array');
  if (!_.isArray(deletedRecords)) throw new Error('Expected deletedRecords to be an array');

  // const deleteIds = _.pluck(deletedRecords, 'id');

  // return current.map(function(record) {
  //   const deleted = _.includes(deleteIds, record.id);
  //   if (deleted) return record.without('deleted').without('busy');
  //   return record;
  // });

  return current;
}

module.exports = error;
