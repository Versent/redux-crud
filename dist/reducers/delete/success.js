"use strict";
const common_1 = require("../common");
const reject = require('lodash.reject');
function success(config, current, record) {
    const reducerName = 'deleteSuccess';
    record = common_1.default(config, current, record, reducerName);
    var key = config.key;
    var deleteId = record[key];
    function predicate(existingRecord) {
        return deleteId == existingRecord[key];
    }
    ;
    return reject(current, predicate);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
