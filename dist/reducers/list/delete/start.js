"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
const constants_1 = require("../../../constants");
const findByKey_1 = require("../../../utils/findByKey");
const mergeMutable_1 = require("../../../utils/mergeMutable");
var reducerName = constants_1.default.REDUCER_NAMES.DELETE_START;
function start(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    var recordStatus = {
        deleted: true,
        busy: true,
    };
    var deleteRecord = findByKey_1.default(current, key, deleteId);
    deleteRecord = r.merge(deleteRecord, recordStatus);
    return mergeMutable_1.default(current, deleteRecord, key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
