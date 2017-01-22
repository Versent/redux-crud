"use strict";
const r = require("ramda");
function wrapArray(recordOrRecords) {
    var isArray = r.is(Array, recordOrRecords);
    return isArray ? recordOrRecords : [recordOrRecords];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wrapArray;
