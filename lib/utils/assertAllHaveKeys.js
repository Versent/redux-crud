var _ = require('lodash');

module.exports = function(config, reducerName, records) {
  // All given records must have a key
  var allKeys = _.all(records, config.key);
  if (!allKeys) throw new Error(reducerName + ': Expected all records to have a value for the store\'s key `' + config.key + '`');
}
