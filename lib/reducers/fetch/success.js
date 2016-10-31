var isArray           = require('lodash.isarray');
var assertAllHaveKeys = require('../../utils/assertAllHaveKeys');
var makeImmutable     = require('../../utils/makeImmutable');
var isImmutable       = require('../../utils/isImmutableJs');
var siu               = require('siu');
var wrapArray         = require('../../utils/wrapArray');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');
var fromJS            = require('immutable').fromJS;

function success(config, current, records) {
  var reducerName = config.resourceName + '.fetchSuccess';

  if (config.store === constants.STORE_IMMUTABLE) {
    current = current.toJS();
    if (isImmutable(records)) {
      records = records.toJS();
    }
  }

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!isArray(current))        throw new Error(reducerName + ': Expected current to be an array');
  if (!records)                 throw new Error(reducerName + ': Expected records');

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  switch(config.store) {
    case constants.STORE_MUTABLE:
      return mergeMutable(current, records, config.key);
    case constants.STORE_IMMUTABLE:
      return fromJS(mergeMutable(current, records, config.key));
    default:
      records = makeImmutable(records);
      return siu.a.merge(current, records, config.key);
  }

}

module.exports = success;
