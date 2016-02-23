module.exports = function(item) {
  return typeof item.toJS === 'function';
}
