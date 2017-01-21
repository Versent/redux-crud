"use strict";
const assertValidStore_1 = require("./assertValidStore");
const invariants_1 = require("../invariants");
function invariantsMap(config, current, record, reducerName) {
    invariants_1.default(config, current, record, reducerName, assertValidStore_1.default);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invariantsMap;
