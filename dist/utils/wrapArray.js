"use strict";
const lodash_isarray_1 = require("lodash.isarray");
function wrapArray(recordOrRecords) {
    return lodash_isarray_1.default(recordOrRecords) ? recordOrRecords : [recordOrRecords];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wrapArray;
;
