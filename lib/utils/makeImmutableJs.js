var fromJS = require('immutable').fromJS;

module.exports = function(records) {
  if (typeof records.toJS === 'function') {
    return records
  }
  return fromJS(records);
}
