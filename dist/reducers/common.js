"use strict";
const assertHasKey_1 = require("../utils/assertHasKey");
const assertNotArray_1 = require("../utils/assertNotArray");
const constants_1 = require("../constants");
const makeScope_1 = require("../utils/makeScope");
const isArray = require('lodash.isarray');
const isObject = require('lodash.isobject');
function common(config, current, record, reducerName) {
    if (!config.resourceName)
        throw new Error('Expected config.resourceName');
    const scope = makeScope_1.default(config, reducerName);
    if (!config.key)
        throw new Error(scope + ': Expected config.key');
    if (!record)
        throw new Error(scope + ': Expected record');
    if (config.store === constants_1.default.STORE_MAP) {
        if (!isObject(current))
            throw new Error(scope + ': Expected current to be an object');
    }
    else {
        if (!isArray(current))
            throw new Error(scope + ': Expected current to be an array');
    }
    assertNotArray_1.default(config, reducerName, record);
    assertHasKey_1.default(config, reducerName, record);
    return record;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = common;
