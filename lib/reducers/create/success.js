// import siu           from 'siu';
var _ = require('lodash');

function success(resourcesName, current, createdRecords) {
  // log.debug('success', createdRecords);
  if (!_.isArray(current))             throw new Error('Expected current to be an array');
  if (!_.isArray(createdRecords))      throw new Error('Expected createdRecords to be an array');

  // return siu.a.merge(current, createdRecords, 'id');

  return current;
}

module.exports = success;
