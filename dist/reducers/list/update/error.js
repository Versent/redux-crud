"use strict";
const common_1 = require("../../common");
const findByKey_1 = require("../../../utils/findByKey");
const mergeMutable_1 = require("../../../utils/mergeMutable");
const omit = require('lodash.omit');
function error(config, current, record) {
    // We don't want to rollback
    var reducerName = 'updateError';
    record = common_1.default(config, current, record, reducerName);
    var key = config.key;
    var updatedId = record[key];
    var updatedRecord = findByKey_1.default(current, key, updatedId);
    if (updatedRecord) {
        updatedRecord = omit(updatedRecord, 'busy');
        return mergeMutable_1.default(current, updatedRecord, key);
    }
    else {
        return current;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
