var _ = require('lodash');

module.exports = function(config, scope, record) {
  if (_.isArray(record)) throw new Error(scope + ': Expected record not to be an array');
}
