"use strict";
var r = require("ramda");
var constants_1 = require("../../../constants");
var invariants_1 = require("../invariants");
var reducerName = constants_1.default.REDUCER_NAMES.CREATE_SUCCESS;
var invariantArgs = {
    reducerName: reducerName,
    canBeArray: false,
};
function success(config, current, addedRecord, clientGeneratedKey) {
    invariants_1.default(invariantArgs, config, current, addedRecord);
    var key = config.key;
    var done = false;
    // Keep the clientGeneratedKey if provided
    if (clientGeneratedKey != null) {
        addedRecord = r.merge(addedRecord, (_a = {},
            _a[constants_1.default.SPECIAL_KEYS.CLIENT_GENERATED_ID] = clientGeneratedKey,
            _a));
    }
    // Update existing records
    var updatedCollection = current.map(function (record) {
        var recordKey = record[key];
        if (recordKey == null)
            throw new Error('Expected record to have ' + key);
        var isSameKey = recordKey === addedRecord[key];
        var isSameClientGetKey = (clientGeneratedKey != null && clientGeneratedKey === recordKey);
        if (isSameKey || isSameClientGetKey) {
            done = true;
            return addedRecord;
        }
        else {
            return record;
        }
    });
    // Add if not updated
    if (!done) {
        updatedCollection = updatedCollection.concat([addedRecord]);
    }
    return updatedCollection;
    var _a;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
