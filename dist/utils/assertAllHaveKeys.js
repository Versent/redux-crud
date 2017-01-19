"use strict";
const every = require('lodash.every');
function default_1(config, reducerName, records) {
    // All given records must have a key
    var allKeys = every(records, config.key);
    if (!allKeys)
        throw new Error(reducerName + ': Expected all records to have a value for the store\'s key `' + config.key + '`');
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
