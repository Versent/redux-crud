var isArray           = require('lodash.isarray');
var assertAllHaveKeys = require('../../utils/assertAllHaveKeys');
var wrapArray         = require('../../utils/wrapArray');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function success(config, current, records) {
  var reducerName = config.resourceName + '.fetchSuccess';

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!isArray(current))        throw new Error(reducerName + ': Expected current to be an array');
  if (!records)                 throw new Error(reducerName + ': Expected records');

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);
  
  return mergeMutable(current, records, config.key);
}

module.exports = success;
