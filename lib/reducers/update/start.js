var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');

function start(config, current, record) {
  var reducerName = 'updateStart';

  record = common(config, current, record, reducerName);

  // mark record as unsaved and busy
  var recordStatus = {
    busy:          true,
    pendingUpdate: true,
  };

  // replace record
  return config.store === 'mutable' ?
    mergeMutable(current, _.assign({}, record, recordStatus), config.key) :
    siu.a.merge(current, record.merge(recordStatus), config.key);

}

module.exports = start;
