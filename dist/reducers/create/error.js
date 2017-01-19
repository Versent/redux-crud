"use strict";
const assertNotArray_1 = require("../../utils/assertNotArray");
const common_1 = require("../common");
const constants_1 = require("../../constants");
const remove_1 = require("../../stores/list/remove");
const remove_2 = require("../../stores/map/remove");
function error(config, current, addedRecord) {
    var reducerName = "createError";
    assertNotArray_1.default(config, reducerName, addedRecord);
    addedRecord = common_1.default(config, current, addedRecord, reducerName);
    if (config.store === constants_1.default.STORE_MAP) {
        return remove_2.default(config, current, addedRecord);
    }
    else {
        return remove_1.default(config, current, addedRecord);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
