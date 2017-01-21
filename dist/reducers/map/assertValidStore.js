"use strict";
const isObject = require('lodash.isobject');
function assertValidStore(scope, current) {
    if (!isObject(current))
        throw new Error(scope + ': Expected current to be an object');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assertValidStore;
