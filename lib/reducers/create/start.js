// import siu           from 'siu';
var _ = require('lodash');

function start(resourcesName, current, records) {
  if (!_.isArray(current))      throw new Error('Expected current to be an array');
  if (!_.isArray(records))      throw new Error('Expected records to be an array');

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
