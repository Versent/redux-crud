import * as is from "ramda/src/is"

export default function wrapArray(recordOrRecords) {
  var isArray = is(Array, recordOrRecords);
  return isArray ? recordOrRecords : [recordOrRecords];
}
