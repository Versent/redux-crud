import wrapArray from "../../../utils/wrapArray";

/*
Replaces an existing record in a list
Or adds if not there
*/
export default function merge(current, records, key) {
  records = wrapArray(records);
  var recordMap = {};
  var indexMap = {};
  var newRecords = current.slice(0);

  current.forEach(function(record, index) {
    var recordKey = record[key];
    if (recordKey == null) throw new Error("Expected record to have " + key);
    recordMap[recordKey] = record;
    indexMap[recordKey] = index;
  });

  records.forEach(function(record) {
    var recordId = record[key];
    if (recordMap[recordId]) {
      newRecords[indexMap[recordId]] = record;
    } else {
      indexMap[recordId] = newRecords.length;
      newRecords.push(record);
    }
    recordMap[recordId] = record;
  });

  return newRecords;
}
