"use strict";
var r = require("ramda");
var constants_1 = require("../../../constants");
var invariants_1 = require("../invariants");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_SUCCESS;
var invariantArgs = {
    reducerName: reducerName,
    canBeArray: false,
};
function success(config, current, addedRecord, clientGenKey) {
    invariants_1.default(invariantArgs, config, current, addedRecord);
    var key = config.key;
    var done = false;
    var addedRecordKey = addedRecord[key];
    // Update existing records
    var updatedCollection = r.map(function (existingRecord) {
        var recordKey = existingRecord[key];
        if (recordKey == null)
            throw new Error('Expected record to have ' + key);
        var isSameKey = recordKey === addedRecordKey;
        var isSameClientGetKey = (clientGenKey != null && clientGenKey === recordKey);
        if (isSameKey || isSameClientGetKey) {
            done = true;
            return addedRecord;
        }
        else {
            return existingRecord;
        }
    })(current);
    // Add if not updated
    if (!done) {
        var merge = (_a = {},
            _a[addedRecordKey] = addedRecord,
            _a);
        updatedCollection = r.merge(updatedCollection, merge);
    }
    return updatedCollection;
    var _a;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
