"use strict";
const assertAllHaveKeys_1 = require("../../utils/assertAllHaveKeys");
const lodash_isarray_1 = require("lodash.isarray");
const mergeMutable_1 = require("../../utils/mergeMutable");
const wrapArray_1 = require("../../utils/wrapArray");
function success(config, current, records) {
    var reducerName = config.resourceName + '.fetchSuccess';
    if (!config.key)
        throw new Error(reducerName + ': Expected config.key');
    if (!lodash_isarray_1.default(current))
        throw new Error(reducerName + ': Expected current to be an array');
    if (!records)
        throw new Error(reducerName + ': Expected records');
    // wrap array
    records = wrapArray_1.default(records);
    // All given records must have a key
    assertAllHaveKeys_1.default(config, reducerName, records);
    return mergeMutable_1.default(current, records, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
