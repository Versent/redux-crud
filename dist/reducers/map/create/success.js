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
    var addedRecordKey = addedRecord[key];
    var addedRecordKeyLens = r.lensProp(addedRecordKey);
    // Keep the cuid in the record if there is one
    if (clientGeneratedKey != null) {
        addedRecord = r.merge(addedRecord, (_a = {},
            _a[constants_1.default.SPECIAL_KEYS.CLIENT_GENERATED_ID] = clientGeneratedKey,
            _a));
    }
    var currentWithoutClientGeneratedKey = r.dissoc(clientGeneratedKey, current);
    return r.set(addedRecordKeyLens, addedRecord, currentWithoutClientGeneratedKey);
    var _a;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
