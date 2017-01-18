"use strict";
const assertNotArray_1 = require("../../utils/assertNotArray");
const lodash_assign_1 = require("lodash.assign");
const common_1 = require("../common");
const mergeMutable_1 = require("../../utils/mergeMutable");
function start(config, current, record) {
    var reducerName = 'createStart';
    assertNotArray_1.default(config, reducerName, record);
    record = common_1.default(config, current, record, reducerName);
    var recordStatus = {
        busy: true,
        pendingCreate: true,
    };
    var newRecord = lodash_assign_1.default({}, record, recordStatus);
    // mark record as unsaved and busy
    return mergeMutable_1.default(current, newRecord, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
