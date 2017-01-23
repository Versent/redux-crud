"use strict";
const r = require("ramda");
const assertNotArray_1 = require("../../../utils/assertNotArray");
const constants_1 = require("../../../constants");
const invariants_1 = require("../invariants");
const store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_START;
function start(config, current, record) {
    assertNotArray_1.default(config, reducerName, record);
    invariants_1.default(config, current, record, reducerName);
    var recordStatus = {
        busy: true,
        pendingCreate: true,
    };
    var newRecord = r.merge(record, recordStatus);
    // mark record as unsaved and busy
    return store_1.default.merge(current, newRecord, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
