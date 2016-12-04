var find = require('lodash.find');

function findByKey(collection, key, id) {
  function predicate(record) {
    return record[key] === id;
  }

  return find(collection, predicate);
}

module.exports = findByKey;
