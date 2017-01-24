"use strict";
const start_1 = require("../../common/delete/start");
const invariants_1 = require("../invariants");
const constants_1 = require("../../../constants");
const store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.DELETE_START;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function start(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    var key = config.key;
    var deleteId = record[key];
    var deleteRecord = current[deleteId];
    if (deleteRecord == null) {
        return current;
    }
    else {
        deleteRecord = start_1.prepareRecord(deleteRecord);
        return store_1.default.merge(config, current, deleteRecord);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
