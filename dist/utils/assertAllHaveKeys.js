"use strict";
const r = require("ramda");
function default_1(config, reducerName, records) {
    // All given records must have a key
    var haskey = r.has(config.key);
    var allKeys = r.all(haskey, records);
    if (!allKeys) {
        throw new Error(reducerName + ": Expected all records to have a value for the store\'s key `" + config.key + "`");
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
