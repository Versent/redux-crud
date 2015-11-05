var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function start(config, current, record) {
  var reducerName = 'updateStart';

  record = common(config, current, record, reducerName);

  // mark record as unsaved and busy
  var recordStatus = {
    busy:          true,
    pendingUpdate: true,
  };

  // replace record
  switch(config.store) {
    case constants.STORE_MUTABLE:
      return mergeMutable(current, _.assign({}, record, recordStatus), config.key);
    default:
      return siu.a.merge(current, record.merge(recordStatus), config.key);
  }

}

module.exports = start;
