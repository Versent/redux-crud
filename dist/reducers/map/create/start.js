"use strict";
const r = require("ramda");
const constants_1 = require("../../../constants");
const invariants_1 = require("../invariants");
const store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_START;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function start(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    var recordStatus = {
        busy: true,
        pendingCreate: true,
    };
    var newRecord = r.merge(record, recordStatus);
    // mark record as unsaved and busy
    return store_1.default.merge(config, current, newRecord);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
