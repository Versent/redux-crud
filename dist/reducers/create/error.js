"use strict";
const assertNotArray_1 = require("../../utils/assertNotArray");
const common_1 = require("../common");
const getStore_1 = require("../../stores/getStore");
function error(config, current, addedRecord) {
    var reducerName = "createError";
    assertNotArray_1.default(config, reducerName, addedRecord);
    addedRecord = common_1.default(config, current, addedRecord, reducerName);
    const remove = getStore_1.default(config).remove;
    return remove(config, current, addedRecord);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
