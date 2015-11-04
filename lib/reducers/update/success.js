var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function success(config, current, record) {
  var reducerName = 'updateStart';

  record = common(config, current, record, reducerName);

  // replace record
  return config.store === constants.STORE_MUTABLE ?
    mergeMutable(current, record, config.key) :
    siu.a.merge(current, record, config.key);
}

module.exports = success;
