"use strict";
const common_1 = require("../../common");
const remove_1 = require("../store/remove");
function error(config, current, record) {
    var reducerName = "createError";
    record = common_1.default(config, current, record, reducerName);
    return remove_1.default(config, current, record);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
