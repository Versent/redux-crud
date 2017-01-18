"use strict";
const assertHasKey_1 = require("../utils/assertHasKey");
const assertNotArray_1 = require("../utils/assertNotArray");
const constants_1 = require("../constants");
const lodash_isarray_1 = require("lodash.isarray");
const lodash_isobject_1 = require("lodash.isobject");
function common(config, current, record, reducerName) {
    if (!config.resourceName)
        throw new Error('Expected config.resourceName');
    reducerName = config.resourceName + '.' + reducerName;
    if (!config.key)
        throw new Error(reducerName + ': Expected config.key');
    if (!record)
        throw new Error(reducerName + ': Expected record');
    if (config.store === constants_1.default.STORE_MAP) {
        if (!lodash_isobject_1.default(current))
            throw new Error(reducerName + ': Expected current to be an object');
    }
    else {
        if (!lodash_isarray_1.default(current))
            throw new Error(reducerName + ': Expected current to be an array');
    }
    assertNotArray_1.default(config, reducerName, record);
    assertHasKey_1.default(config, reducerName, record);
    return record;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = common;
