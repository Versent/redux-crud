"use strict";
const assertNotArray_1 = require("../../../utils/assertNotArray");
const common_1 = require("../common");
const mergeMutable_1 = require("../../../utils/mergeMutable");
const assign = require('lodash.assign');
function start(config, current, record) {
    var reducerName = "createStart";
    assertNotArray_1.default(config, reducerName, record);
    record = common_1.default(config, current, record, reducerName);
    var recordStatus = {
        busy: true,
        pendingCreate: true,
    };
    var newRecord = assign({}, record, recordStatus);
    // mark record as unsaved and busy
    return mergeMutable_1.default(current, newRecord, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
