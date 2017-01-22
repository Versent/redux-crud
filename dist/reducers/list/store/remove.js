"use strict";
const r = require("ramda");
function remove(config, current, addedRecord) {
    var key = config.key;
    function predicate(record) {
        var recordKey = record[key];
        var isSameKey = addedRecord[key] === recordKey;
        return isSameKey;
    }
    return r.reject(predicate, current);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove;
