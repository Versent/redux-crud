import * as r from "ramda";

export default function wrapArray(recordOrRecords) {
  var isArray = r.is(Array, recordOrRecords);
  return isArray ? recordOrRecords : [recordOrRecords];
}
