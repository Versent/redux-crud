var common            = require('../common');
var siu               = require('siu');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');
var fromJS          = require('immutable').fromJS;

function success(config, current, record) {
  var reducerName = 'updateSuccess';

  record = common(config, current, record, reducerName);

  if (config.store === constants.STORE_IMMUTABLE) {
    record = record.toJS();
    current = current.toJS();
  }

  // replace record
  switch(config.store) {
    case constants.STORE_MUTABLE:
      return mergeMutable(current, record, config.key);
    case constants.STORE_IMMUTABLE:
      return fromJS(mergeMutable(current, record, config.key));
    default:
      return siu.a.merge(current, record, config.key);
  }
}

module.exports = success;
