var isArray           = require('lodash.isarray');

module.exports = function(config, scope, record) {
  if (isArray(record)) throw new TypeError(scope + ': Expected record not to be an array');
}
