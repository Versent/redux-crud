var _ = require('lodash');

function error(resourcesName, current, updatedRecords) {
  // We don't want to rollback
  if (!_.isArray(current))        throw new Error('Expected current to be an array');
  if (!_.isArray(updatedRecords)) throw new Error('Expected updatedRecords to be an array');

  // const updatedIds = _.pluck(updatedRecords, 'id');

  // return current.map(function(record) {
  //   const included = _.includes(updatedIds, record.id);
  //   if (included) return record.without('busy');
  //   return record;
  // });

  return current;
}

module.exports = error;
