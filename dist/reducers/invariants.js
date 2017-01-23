"use strict";
const assertHasKey_1 = require("./invariants/assertHasKey");
const assertNotArray_1 = require("../utils/assertNotArray");
const makeScope_1 = require("../utils/makeScope");
function invariants(baseArgs, extraArgs) {
    var config = extraArgs.config;
    if (!config.resourceName)
        throw new Error("Expected config.resourceName");
    const scope = makeScope_1.default(config, baseArgs.reducerName);
    if (!config.key)
        throw new Error(scope + ": Expected config.key");
    if (!extraArgs.record)
        throw new Error(scope + ": Expected record/s");
    extraArgs.assertValidStore(scope, extraArgs.current);
    assertHasKey_1.default(extraArgs.config, scope, extraArgs.record);
    if (!baseArgs.canBeArray) {
        assertNotArray_1.default(extraArgs.config, baseArgs.reducerName, extraArgs.record);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invariants;
