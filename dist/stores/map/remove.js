"use strict";
const omit = require('lodash.omit');
function remove(config, current, addedRecord) {
    var key = config.key;
    return omit(current, addedRecord[key]);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove;
