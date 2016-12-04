var isArray           = require('lodash.isarray');
var assertHasKey      = require('../utils/assertHasKey');
var assertNotArray    = require('../utils/assertNotArray');
var wrapArray         = require('../utils/wrapArray');
var constants         = require('../../constants');

function common(config, current, record, reducerName) {
  if (!config.resourceName)     throw new Error('Expected config.resourceName');
  reducerName = config.resourceName + '.' + reducerName;

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!isArray(current))        throw new Error(reducerName + ': Expected current to be an array');
  if (!record)                  throw new Error(reducerName + ': Expected record');

  assertNotArray(config, reducerName, record);
  assertHasKey(config, reducerName, record);

  return record;
}

module.exports = common;
