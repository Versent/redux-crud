var _                 = require('lodash');
var common            = require('../common');
var siu               = require('siu');

function success(config, current, record) {
  var reducerName = 'updateStart';

  record = common(config, current, record, reducerName);

  // replace record
  return siu.a.merge(current, record, config.key);
}

module.exports = success;
