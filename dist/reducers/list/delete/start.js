"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
const constants_1 = require("../../../constants");
const findByKey_1 = require("../../../utils/findByKey");
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
    var recordStatus = {
        deleted: true,
        busy: true,
    };
    var deleteRecord = findByKey_1.default(current, key, deleteId);
    deleteRecord = r.merge(deleteRecord, recordStatus);
    return store_1.default.merge(current, deleteRecord, key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
