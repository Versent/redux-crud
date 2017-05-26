"use strict";
var r = require("ramda");
var invariants_1 = require("../invariants");
var constants_1 = require("../../../constants");
var reducerName = constants_1.default.REDUCER_NAMES.DELETE_SUCCESS;
var invariantArgs = {
    reducerName: reducerName,
    canBeArray: false
};
function success(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    var key = config.key;
    var deleteId = record[key];
    function predicate(existingRecord) {
        return deleteId == existingRecord[key];
    }
    return r.reject(predicate, current);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
