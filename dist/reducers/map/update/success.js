"use strict";
const constants_1 = require("../../../constants");
const invariants_1 = require("../invariants");
const store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.UPDATE_SUCCESS;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function success(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    return store_1.default.merge(config, current, record);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
