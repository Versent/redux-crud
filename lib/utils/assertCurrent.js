var siu               = require('siu');

module.exports = function(config, reducerName, records) {
  if (!siu.isImmutable(records))  throw new Error(reducerName + ': Expected current to be immutable');
}
