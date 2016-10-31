var isArray           = require('lodash.isarray');
var assertHasKey      = require('../utils/assertHasKey');
var assertCurrent     = require('../utils/assertCurrent');
var assertNotArray    = require('../utils/assertNotArray');
var makeImmutable     = require('../utils/makeImmutable');
var makeImmutableJs   = require('../utils/makeImmutableJs');
var siu               = require('siu');
var wrapArray         = require('../utils/wrapArray');
var constants         = require('../../constants');

function common(config, current, record, reducerName) {
  if (!config.resourceName)     throw new Error('Expected config.resourceName');
  reducerName = config.resourceName + '.' + reducerName;

  if (config.store === constants.STORE_IMMUTABLE) {
    current = current.toArray();
  }

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!isArray(current))      throw new Error(reducerName + ': Expected current to be an array');
  if (!record)                  throw new Error(reducerName + ': Expected record');

  assertNotArray(config, reducerName, record);
  assertHasKey(config, reducerName, record);

  if (config.store === constants.SI) {
    assertCurrent(config, reducerName, current);
    record = makeImmutable(record);
  }
  else if (config.store === constants.STORE_IMMUTABLE) {
    record = makeImmutableJs(record);
  }

  return record;
}

module.exports = common;
