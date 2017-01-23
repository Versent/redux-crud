"use strict";
const r = require("ramda");
const constants_1 = require("../../../constants");
const findByKey_1 = require("../../../utils/findByKey");
const invariants_1 = require("../invariants");
const mergeMutable_1 = require("../../../utils/mergeMutable");
var reducerName = constants_1.default.REDUCER_NAMES.DELETE_ERROR;
function error(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    var deleteRecord = findByKey_1.default(current, key, deleteId);
    deleteRecord = r.omit(['deleted', 'busy'], deleteRecord);
    return mergeMutable_1.default(current, deleteRecord, key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
