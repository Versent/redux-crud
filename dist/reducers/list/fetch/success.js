"use strict";
const r = require("ramda");
const assertAllHaveKeys_1 = require("../../../utils/assertAllHaveKeys");
const constants_1 = require("../../../constants");
const makeScope_1 = require("../../../utils/makeScope");
const store_1 = require("../store");
const wrapArray_1 = require("../../../utils/wrapArray");
var reducerName = constants_1.default.REDUCER_NAMES.FETCH_SUCCESS;
function success(config, current, records) {
    var scope = makeScope_1.default(config, reducerName);
    if (!config.key)
        throw new Error(scope + ": Expected config.key");
    if (!r.is(Array, current))
        throw new Error(scope + ": Expected current to be an array");
    if (!records)
        throw new Error(scope + ": Expected records");
    // wrap array
    records = wrapArray_1.default(records);
    // All given records must have a key
    assertAllHaveKeys_1.default(config, reducerName, records);
    return store_1.default.merge(current, records, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
