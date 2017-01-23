"use strict";
const r = require("ramda");
const constants_1 = require("../../../constants");
const invariants_1 = require("../invariants");
var reducerName = constants_1.default.REDUCER_NAMES.DELETE_ERROR;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function error(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    var key = config.key;
    var deleteId = record[key];
    // Find the record
    var deleteRecord = current[deleteId];
    if (deleteRecord == null) {
        return current;
    }
    else {
        // Remove deleted and busy
        deleteRecord = r.omit(["deleted", "busy"], deleteRecord);
        return r.merge(current, { [deleteId]: deleteRecord });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
