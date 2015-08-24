var _ = require('lodash');

module.exports = function(config, reducerName, record) {
  if (record[config.key] == null) throw new Error(reducerName + ': Expected to record to have ' + config.key);
}
