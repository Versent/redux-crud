"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
const constants_1 = require("../../../constants");
var reducerName = constants_1.default.REDUCER_NAMES.DELETE_SUCCESS;
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
