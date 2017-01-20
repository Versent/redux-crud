"use strict";
const reject = require('lodash.reject');
function remove(config, current, addedRecord) {
    var key = config.key;
    function predicate(record) {
        var recordKey = record[key];
        var isSameKey = addedRecord[key] === recordKey;
        return isSameKey;
    }
    return reject(current, predicate);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove;
