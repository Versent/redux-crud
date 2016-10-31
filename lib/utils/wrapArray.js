var isArray     = require('lodash.isarray');

module.exports = function wrapArray(recordOrRecords) {
  return isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
};
