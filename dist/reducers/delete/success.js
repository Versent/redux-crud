"use strict";
const lodash_reject_1 = require("lodash.reject");
const common_1 = require("../common");
function success(config, current, record) {
    var reducerName = 'deleteSuccess';
    record = common_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    function predicate(existingRecord) {
        return deleteId == existingRecord[key];
    }
    ;
    return lodash_reject_1.default(current, predicate);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
