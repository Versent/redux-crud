"use strict";
const assertNotArray_1 = require("../../../utils/assertNotArray");
const invariants_1 = require("../invariants");
const mergeMutable_1 = require("../../../utils/mergeMutable");
var assign = require('lodash.assign');
var reducerName = "createStart";
function start(config, current, record) {
    assertNotArray_1.default(config, reducerName, record);
    invariants_1.default(config, current, record, reducerName);
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
