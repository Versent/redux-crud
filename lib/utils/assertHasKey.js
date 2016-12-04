var _ = require('lodash');
var constants = require('../../constants');

module.exports = function(config, reducerName, record) {

  function throwErr() {
    throw new Error(reducerName + ': Expected to record to have ' + config.key);
  }

  if (record[config.key] == null) {
    throwErr();
  }
}
