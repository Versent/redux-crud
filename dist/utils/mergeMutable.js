"use strict";
const lodash_foreach_1 = require("lodash.foreach");
const wrapArray_1 = require("./wrapArray");
function mergeMutable(current, records, key) {
    records = wrapArray_1.default(records);
    var recordMap = {};
    var indexMap = {};
    var newRecords = current.slice(0);
    lodash_foreach_1.default(current, function (record, index) {
        var recordKey = record[key];
        if (recordKey == null)
            throw new Error('Expected record to have ' + key);
        recordMap[recordKey] = record;
        indexMap[recordKey] = index;
    });
    lodash_foreach_1.default(records, function (record, index) {
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
