import * as r from "ramda";

export default function(config, reducerName, records) {
  // All given records must have a key
  var haskey = r.has(config.key);
  var allKeys = r.all(haskey, records);

  if (!allKeys) {
    throw new Error(
      reducerName +
        ": Expected all records to have a value for the store's key `" +
        config.key +
        "`"
    );
  }
}
