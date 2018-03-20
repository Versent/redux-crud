import wrapArray from "../../../utils/wrapArray";
import * as mergeDeepRight from "ramda/src/mergeDeepRight";

/*
Replaces an existing record in a list
Or adds if not there
*/
export default function merge(current, records, key, partial = false) {
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
			newRecords[indexMap[recordId]] = partial
				? mergeDeepRight(recordMap[recordId], record)
				: record;
		} else {
			indexMap[recordId] = newRecords.length;
			newRecords.push(record);
		}
		recordMap[recordId] = record;
	});

	return newRecords;
}
