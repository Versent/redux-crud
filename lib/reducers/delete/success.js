var _                 = require('lodash');
var assertAllHaveKeys = require('../../utils/assertAllHaveKeys');
var assertCurrent     = require('../../utils/assertCurrent');
var makeImmutable     = require('../../utils/makeImmutable');
var siu               = require('siu');
var wrapArray         = require('../../utils/wrapArray');

function success(config, current, records) {
  var reducerName = config.resourcesName + '.deleteSuccess';

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!_.isArray(current))      throw new Error(reducerName + ': Expected current to be an array');
  if (!records)                 throw new Error(reducerName + ': Expected records');

  assertCurrent(config, reducerName, current);

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  records = makeImmutable(records);

  var deleteIds = _.pluck(records, config.key);

  return siu.a.reject(current, function(record) {
    return _.includes(deleteIds, record[config.key]);
  });
}

module.exports = success;
