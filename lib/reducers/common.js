var _                 = require('lodash');
var assertHasKey      = require('../utils/assertHasKey');
var assertCurrent     = require('../utils/assertCurrent');
var assertNotArray    = require('../utils/assertNotArray');
var makeImmutable     = require('../utils/makeImmutable');
var siu               = require('siu');
var wrapArray         = require('../utils/wrapArray');

function common(config, current, record, reducerName) {
  if (!config.resourceName)     throw new Error('Expected config.resourceName');
  reducerName = config.resourceName + '.' + reducerName;

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!_.isArray(current))      throw new Error(reducerName + ': Expected current to be an array');
  if (!record)                  throw new Error(reducerName + ': Expected record');

  assertCurrent(config, reducerName, current);
  assertNotArray(config, reducerName, record);
  assertHasKey(config, reducerName, record);

  record = makeImmutable(record);

  return record;
}

module.exports = common;
