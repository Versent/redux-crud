"use strict";
const assertNotArray_1 = require("../../utils/assertNotArray");
const common_1 = require("../common");
const constants_1 = require("../../constants");
const lodash_omit_1 = require("lodash.omit");
const lodash_reject_1 = require("lodash.reject");
function errorList(config, current, addedRecord) {
    var key = config.key;
    function predicate(record) {
        var recordKey = record[key];
        var isSameKey = addedRecord[key] === recordKey;
        return isSameKey;
    }
    return lodash_reject_1.default(current, predicate);
}
function errorMap(config, current, addedRecord) {
    var key = config.key;
    return lodash_omit_1.default(current, addedRecord[key]);
}
function error(config, current, addedRecord) {
    var reducerName = 'createError';
    assertNotArray_1.default(config, reducerName, addedRecord);
    addedRecord = common_1.default(config, current, addedRecord, reducerName);
    if (config.store === constants_1.default.STORE_MAP) {
        return errorMap(config, current, addedRecord);
    }
    else {
        return errorList(config, current, addedRecord);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
