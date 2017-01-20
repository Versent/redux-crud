"use strict";
const common_1 = require("../../common");
const mergeMutable_1 = require("../../../utils/mergeMutable");
function success(config, current, record) {
    let reducerName = 'updateSuccess';
    record = common_1.default(config, current, record, reducerName);
    // replace record
    return mergeMutable_1.default(current, record, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
