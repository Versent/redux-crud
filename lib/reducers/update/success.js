var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');

function success(config, current, record) {
  var reducerName = 'updateStart';

  record = common(config, current, record, reducerName);

  // replace record
  return config.store === 'mutable' ?
    mergeMutable(current, record, config.key) :
    siu.a.merge(current, record, config.key);
}

module.exports = success;
