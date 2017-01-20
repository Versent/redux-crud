"use strict";
const isArray = require('lodash.isarray');
function wrapArray(recordOrRecords) {
    return isArray(recordOrRecords) ? recordOrRecords : [recordOrRecords];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wrapArray;
