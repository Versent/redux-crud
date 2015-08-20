// import siu           from 'siu';
var _ = require('lodash');

function success(resourcesName, current, records) {
  if (!_.isArray(current))      throw new Error('Expected current to be an array');
  if (!_.isArray(records))      throw new Error('Expected records to be an array');

  // replace records
  // return siu.a.merge(current, records, 'id');

  return current;
}

module.exports = success;
