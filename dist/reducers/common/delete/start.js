"use strict";
var r = require("ramda");
var constants_1 = require("../../../constants");
function prepareRecord(record) {
    var recordStatus = (_a = {},
        _a[constants_1.default.SPECIAL_KEYS.DELETED] = true,
        _a[constants_1.default.SPECIAL_KEYS.BUSY] = true,
        _a);
    return r.merge(record, recordStatus);
    var _a;
}
exports.prepareRecord = prepareRecord;
