"use strict";
const isArray = require('lodash.isarray');
function default_1(config, scope, record) {
    if (isArray(record))
        throw new TypeError(scope + ': Expected record not to be an array');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
