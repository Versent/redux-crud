"use strict";
const assertAllHaveKeys_1 = require("../../../utils/assertAllHaveKeys");
const makeScope_1 = require("../../../utils/makeScope");
const mergeMutable_1 = require("../../../utils/mergeMutable");
const wrapArray_1 = require("../../../utils/wrapArray");
const isArray = require('lodash.isarray');
function success(config, current, records) {
    var reducerName = 'fetchSuccess';
    var scope = makeScope_1.default(config, reducerName);
    if (!config.key)
        throw new Error(scope + ': Expected config.key');
    if (!isArray(current))
        throw new Error(scope + ': Expected current to be an array');
    if (!records)
        throw new Error(scope + ': Expected records');
    // wrap array
    records = wrapArray_1.default(records);
    // All given records must have a key
    assertAllHaveKeys_1.default(config, reducerName, records);
    return mergeMutable_1.default(current, records, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
