"use strict";
const start_1 = require("../../common/update/start");
const constants_1 = require("../../../constants");
const invariants_1 = require("../invariants");
const store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.UPDATE_START;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function start(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    // mark record as unsaved and busy
    var newRecord = start_1.prepareRecord(record);
    // replace record
    return store_1.default.merge(current, newRecord, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
