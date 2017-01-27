"use strict";
var constants_1 = require("../../../constants");
var invariants_1 = require("../invariants");
var store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.UPDATE_SUCCESS;
var invariantArgs = {
    reducerName: reducerName,
    canBeArray: false,
};
function success(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    return store_1.default.merge(current, record, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
