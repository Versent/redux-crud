"use strict";
var r = require("ramda");
function assertValidStore(scope, current) {
    if (!r.is(Object, current))
        throw new Error(scope + ": Expected current to be an object");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assertValidStore;
