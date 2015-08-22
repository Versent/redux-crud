var _    = require('lodash');

module.exports = function wrapArray(recordOrRecords) {
  return _.isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
};
