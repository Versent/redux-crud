"use strict";
const r = require("ramda");
function remove(config, current, addedRecord) {
    var key = config.key;
    return r.omit([addedRecord[key]], current);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove;
