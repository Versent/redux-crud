var common            = require('../common');
var mergeMutable      = require('../../utils/mergeMutable');
var constants         = require('../../../constants');

function success(config, current, record) {
  var reducerName = 'updateSuccess';

  record = common(config, current, record, reducerName);

  // replace record
  return mergeMutable(current, record, config.key);
}

module.exports = success;
