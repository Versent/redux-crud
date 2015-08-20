// import siu           from 'siu';
var _ = require('lodash');

// const log = bows('reducers.fetch.success');

function success(resourcesName, current, records) {
  // log(records);
  // console.log(resourcesName, current, records);

  if (!_.isArray(current))      throw new Error(resourcesName + ': Expected current to be an array');
  if (!_.isArray(records))      throw new Error(resourcesName + ': Expected records to be an array');

  // return siu.a.merge(current, records, 'id');

  return current;
}

module.exports = success;
