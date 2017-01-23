"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
const constants_1 = require("../../../constants");
const findByKey_1 = require("../../../utils/findByKey");
const store_1 = require("../store");
var reducerName = constants_1.default.REDUCER_NAMES.UPDATE_ERROR;
var invariantArgs = {
    reducerName,
    canBeArray: false,
};
function error(config, current, record) {
    invariants_1.default(invariantArgs, config, current, record);
    // We don"t want to rollback
    var key = config.key;
    var updatedId = record[key];
    var updatedRecord = findByKey_1.default(current, key, updatedId);
    if (updatedRecord) {
        updatedRecord = r.omit(["busy"], updatedRecord);
        return store_1.default.merge(current, updatedRecord, key);
    }
    else {
        return current;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;
