import * as r from "ramda";

export default function findByKey(collection, key, id) {
  function predicate(record) {
    return record[key] === id;
  }

  return r.find(predicate, collection);
}
