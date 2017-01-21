"use strict";
const common_1 = require("../common");
const mergeMutable_1 = require("../../../utils/mergeMutable");
const assign = require('lodash.assign');
function start(config, current, record) {
    var reducerName = 'updateStart';
    record = common_1.default(config, current, record, reducerName);
    // mark record as unsaved and busy
    var recordStatus = {
        busy: true,
        pendingUpdate: true,
    };
    var newRecord = assign({}, record, recordStatus);
    // replace record
    return mergeMutable_1.default(current, newRecord, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
