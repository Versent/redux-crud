"use strict";
const assertHasKey_1 = require("../utils/assertHasKey");
const assertNotArray_1 = require("../utils/assertNotArray");
const makeScope_1 = require("../utils/makeScope");
function common(config, current, record, reducerName, assertValidStore) {
    if (!config.resourceName)
        throw new Error('Expected config.resourceName');
    const scope = makeScope_1.default(config, reducerName);
    if (!config.key)
        throw new Error(scope + ': Expected config.key');
    if (!record)
        throw new Error(scope + ': Expected record');
    assertValidStore(scope, current);
    assertNotArray_1.default(config, reducerName, record);
    assertHasKey_1.default(config, reducerName, record);
    return record;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = common;
