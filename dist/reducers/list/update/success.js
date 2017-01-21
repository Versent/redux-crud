"use strict";
const invariants_1 = require("../invariants");
const mergeMutable_1 = require("../../../utils/mergeMutable");
var reducerName = 'updateSuccess';
function success(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    // replace record
    return mergeMutable_1.default(current, record, config.key);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
