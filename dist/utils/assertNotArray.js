"use strict";
var makeScope_1 = require("../utils/makeScope");
var r = require("ramda");
function default_1(config, reducerName, record) {
    var scope = makeScope_1.default(config, reducerName);
    var isArray = r.is(Array, record);
    if (isArray)
        throw new TypeError(scope + ": Expected record not to be an array");
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
