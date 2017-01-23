"use strict";
const constants_1 = require("../../../constants");
const invariants_1 = require("../invariants");
const remove_1 = require("../store/remove");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_ERROR;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function error(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    return remove_1.default(config, current, record);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
