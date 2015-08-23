var siu       = require('siu');
var _         = require('lodash');
var SI        = require('seamless-immutable');
var wrapArray = require('../../utils/wrapArray');

function success(config, current, records) {
  var reducerName = config.resourcesName + '.success';

  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!_.isArray(current))      throw new Error(reducerName + ': Expected current to be an array');

  // wrap array
  records = wrapArray(records);

  // All given records must have a key
  var allKeys = _.all(records, config.key);

  if (!allKeys) throw new Error(reducerName + ': Expected to have all records with ' + config.key);

  if (!SI.isImmutable(records)) {
    records = SI(records);
  }

  return siu.a.merge(current, records, config.key);
}

module.exports = success;
