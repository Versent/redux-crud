"use strict";
const r = require("ramda");
const constants_1 = require("../../../constants");
const invariants_1 = require("../invariants");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_SUCCESS;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function success(config, current, addedRecord, clientGenKey) {
    invariants_1.default(invariantArgs, config, current, addedRecord);
    var key = config.key;
    var done = false;
    var addedRecordKey = addedRecord[key];
    // Update existing records
    var updatedCollection = r.map((existingRecord) => {
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
        var merge = {
            [addedRecordKey]: addedRecord
        };
        updatedCollection = r.merge(updatedCollection, merge);
    }
    return updatedCollection;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
