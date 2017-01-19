"use strict";
const common_1 = require("../common");
const findByKey_1 = require("../../utils/findByKey");
const mergeMutable_1 = require("../../utils/mergeMutable");
const assign = require('lodash.assign');
function start(config, current, record) {
    const reducerName = 'deleteStart';
    record = common_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    var recordStatus = {
        deleted: true,
        busy: true,
    };
    var deleteRecord = findByKey_1.default(current, key, deleteId);
    deleteRecord = assign({}, deleteRecord, recordStatus);
    return mergeMutable_1.default(current, deleteRecord, key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = start;
