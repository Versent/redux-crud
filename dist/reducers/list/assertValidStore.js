"use strict";
var isArray = require('lodash.isarray');
function assertValidStore(scope, current) {
    if (!isArray(current))
        throw new Error(scope + ': Expected current to be an array');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assertValidStore;
