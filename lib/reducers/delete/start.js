var _ = require('lodash');

function start(resourcesName, current, deletedRecords) {
  // log.debug('start');
  if (!_.isArray(current))          throw new Error('Expected current to be an array');
  if (!_.isArray(deletedRecords))   throw new Error('Expected deletedRecords to be an array');

  // const deleteIds = _.pluck(deletedRecords, 'id');

  // return current.map(function(record) {
  //   const deleted = _.includes(deleteIds, record.id);
  //   if (deleted) {
  //     return record.merge({
  //       deleted: true,
  //       busy:    true,
  //     });
  //   }

  //   return record;
  // });

  return current;
}

module.exports = start;
