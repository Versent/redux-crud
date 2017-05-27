"use strict";
var constants_1 = require("../../../constants");
var invariants_1 = require("../invariants");
var remove_1 = require("../store/remove");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_ERROR;
var invariantArgs = {
    reducerName: reducerName,
    canBeArray: false
};
function error(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    return remove_1.default(config, current, record);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
