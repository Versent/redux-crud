"use strict";
var assertHasKey_1 = require("./invariants/assertHasKey");
var assertNotArray_1 = require("../utils/assertNotArray");
var makeScope_1 = require("../utils/makeScope");
function invariants(baseArgs, extraArgs) {
    var config = extraArgs.config;
    if (!config.resourceName)
        throw new Error("Expected config.resourceName");
    var scope = makeScope_1.default(config, baseArgs.reducerName);
    if (!config.key)
        throw new Error(scope + ": Expected config.key");
    if (!extraArgs.record)
        throw new Error(scope + ": Expected record/s");
    extraArgs.assertValidStore(scope, extraArgs.current);
    if (!baseArgs.canBeArray) {
        assertNotArray_1.default(extraArgs.config, baseArgs.reducerName, extraArgs.record);
    }
    assertHasKey_1.default(extraArgs.config, scope, extraArgs.record);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invariants;
