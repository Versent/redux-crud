var SI                = require('seamless-immutable');

module.exports = function(records) {
  if (SI.isImmutable(records)) {
    return records
  }
  return SI(records);
}
