import * as find from "ramda/src/find"

export default function findByKey(collection, key, id) {
  function predicate(record) {
    return record[key] === id;
  }

  return find(predicate, collection);
}
