"use strict";
var constants_1 = require("../../../constants");
var invariants_1 = require("../invariants");
var store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_ERROR;
var invariantArgs = {
    reducerName: reducerName,
    canBeArray: false,
};
function error(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    return store_1.default.remove(config, current, record);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
