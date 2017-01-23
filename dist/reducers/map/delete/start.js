"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
const constants_1 = require("../../../constants");
const store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.DELETE_START;
function start(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    var recordStatus = {
        deleted: true,
        busy: true,
    };
    var deleteRecord = current[deleteId];
    if (deleteRecord == null) {
        return current;
    }
    else {
        deleteRecord = r.merge(deleteRecord, recordStatus);
        return store_1.default.merge(config, current, deleteRecord);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
