"use strict";
const r = require("ramda");
function assertValidStore(scope, current) {
    var isArray = r.is(Array, current);
    if (!isArray)
        throw new Error(scope + ': Expected current to be an array');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assertValidStore;
