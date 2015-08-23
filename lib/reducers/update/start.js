var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');

function start(config, current, records) {
  var reducerName = 'updateStart';

  records = common(config, current, records, reducerName);

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
