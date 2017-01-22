"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
var reducerName = 'deleteSuccess';
function success(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    function predicate(existingRecord) {
        return deleteId == existingRecord[key];
    }
    return r.reject(predicate, current);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
