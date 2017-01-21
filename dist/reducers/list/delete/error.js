"use strict";
const findByKey_1 = require("../../../utils/findByKey");
const invariants_1 = require("../invariants");
const mergeMutable_1 = require("../../../utils/mergeMutable");
var omit = require('lodash.omit');
var reducerName = 'deleteError';
function error(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    var deleteRecord = findByKey_1.default(current, key, deleteId);
    deleteRecord = omit(deleteRecord, 'deleted', 'busy');
    return mergeMutable_1.default(current, deleteRecord, key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
