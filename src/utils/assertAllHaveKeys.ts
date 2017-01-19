const every = require('lodash.every');

export default function(config, reducerName, records) {
  // All given records must have a key
  var allKeys = every(records, config.key);
  if (!allKeys) throw new Error(reducerName + ': Expected all records to have a value for the store\'s key `' + config.key + '`');
}
