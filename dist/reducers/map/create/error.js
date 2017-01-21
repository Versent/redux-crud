"use strict";
const common_1 = require("../common");
const constants_1 = require("../../../constants");
const remove_1 = require("../store/remove");
function error(config, current, record) {
    var reducerName = constants_1.default.REDUCER_NAMES.CREATE_ERROR;
    record = common_1.default(config, current, record, reducerName);
    return remove_1.default(config, current, record);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
