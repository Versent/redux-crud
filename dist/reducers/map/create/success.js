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
    var addedRecordKey = addedRecord[key];
    var addedRecordKeyLens = r.lensProp(addedRecordKey);
    var clientGenKeyLens = r.lensProp(clientGenKey);
    if (r.view(clientGenKeyLens, current)) {
        return r.set(addedRecordKeyLens, addedRecord, r.dissoc(clientGenKey, current));
    }
    return r.set(addedRecordKeyLens, addedRecord, current);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
