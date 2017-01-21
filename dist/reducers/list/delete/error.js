"use strict";
const common_1 = require("../common");
const findByKey_1 = require("../../../utils/findByKey");
const mergeMutable_1 = require("../../../utils/mergeMutable");
const omit = require('lodash.omit');
function error(config, current, record) {
    const reducerName = 'deleteError';
    record = common_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    var deleteRecord = findByKey_1.default(current, key, deleteId);
    deleteRecord = omit(deleteRecord, 'deleted', 'busy');
    return mergeMutable_1.default(current, deleteRecord, key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
