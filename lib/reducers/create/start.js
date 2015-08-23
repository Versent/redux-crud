var _         = require('lodash');
var wrapArray = require('../../utils/wrapArray');

function start(config, current, records) {
  if (!config.key)              throw new Error(reducerName + ': Expected config.key');
  if (!_.isArray(current))      throw new Error(reducerName + ': Expected current to be an array');

  // wrap array
  records = wrapArray(records);

  // mark records as unsaved and busy
  // var collection = records.map(function(record) {
  //   return record.merge({
  //     unsaved: true,
  //     busy:    true,
  //   });
  // });

  // return siu.a.merge(current, collection, 'id');

  return current;
}

module.exports = start;
