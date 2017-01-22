"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
const mergeMutable_1 = require("../../../utils/mergeMutable");
var reducerName = 'updateStart';
function start(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    // mark record as unsaved and busy
    var recordStatus = {
        busy: true,
        pendingUpdate: true,
    };
    var newRecord = r.merge(record, recordStatus);
    // replace record
    return mergeMutable_1.default(current, newRecord, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
