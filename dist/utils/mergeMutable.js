"use strict";
const wrapArray_1 = require("./wrapArray");
function mergeMutable(current, records, key) {
    records = wrapArray_1.default(records);
    var recordMap = {};
    var indexMap = {};
    var newRecords = current.slice(0);
    current.forEach(function (record, index) {
        var recordKey = record[key];
        if (recordKey == null)
            throw new Error('Expected record to have ' + key);
        recordMap[recordKey] = record;
        indexMap[recordKey] = index;
    });
    records.forEach(function (record, index) {
        var recordId = record[key];
        if (recordMap[recordId]) {
            newRecords[indexMap[recordId]] = record;
        }
        else {
            indexMap[recordId] = newRecords.length;
            newRecords.push(record);
        }
        recordMap[recordId] = record;
    });
    return newRecords;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mergeMutable;
