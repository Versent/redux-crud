"use strict";
var r = require("ramda");
function assert(scope, current) {
    var isArray = r.is(Array, current);
    if (!isArray)
        throw new Error(scope + ": Expected current to be an array");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assert;
