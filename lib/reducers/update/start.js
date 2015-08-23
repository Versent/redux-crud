var _                 = require('lodash');
var assertAllHaveKeys = require('../../utils/assertAllHaveKeys');
var makeImmutable     = require('../../utils/makeImmutable');
var siu               = require('siu');
var wrapArray         = require('../../utils/wrapArray');

function start(config, current, records) {
  var reducerName = config.resourcesName + '.updateStart';

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!_.isArray(current))      throw new Error(reducerName + ': Expected current to be an array');
  if (!records)                 throw new Error(reducerName + ': Expected records');

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  assertAllHaveKeys(config, reducerName, records);

  records = makeImmutable(records);

  // mark records as unsaved and busy
  records = records.map(function(record) {
    return record.merge({
      unsaved: true,
      busy:    true,
    });
  });

  // replace records
  return siu.a.merge(current, records, config.key);

  return records;
}

module.exports = start;
