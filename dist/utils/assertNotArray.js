"use strict";
const makeScope_1 = require("../utils/makeScope");
const isArray = require('lodash.isarray');
function default_1(config, reducerName, record) {
    const scope = makeScope_1.default(config, reducerName);
    if (isArray(record))
        throw new TypeError(scope + ': Expected record not to be an array');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
