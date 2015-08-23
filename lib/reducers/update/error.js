var _                 = require('lodash');
var assertAllHaveKeys = require('../../utils/assertAllHaveKeys');
var assertCurrent     = require('../../utils/assertCurrent');
var makeImmutable     = require('../../utils/makeImmutable');
var siu               = require('siu');
var wrapArray         = require('../../utils/wrapArray');

function error(config, current, records) {
  // We don't want to rollback
  var reducerName = config.resourcesName + '.updateError';

  if (!config.key)                throw new Error(reducerName + ': Expected config.key');
  if (!_.isArray(current))        throw new Error(reducerName + ': Expected current to be an array');
  if (!records)                   throw new Error(reducerName + ': Expected records');

  assertCurrent(config, reducerName, current);

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  var updatedIds = _.pluck(records, config.key);

  return current.map(function(record) {
    const included = _.includes(updatedIds, record[config.key]);
    if (included) return record.without('busy');
    return record;
  });
}

module.exports = error;
