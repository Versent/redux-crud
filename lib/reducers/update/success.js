var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function success(config, current, record) {
  var reducerName = 'updateSuccess';

  record = common(config, current, record, reducerName);

  // replace record
  switch(config.store) {
    case constants.STORE_MUTABLE:
      return mergeMutable(current, record, config.key);
    default:
      return siu.a.merge(current, record, config.key);
  }
}

module.exports = success;
