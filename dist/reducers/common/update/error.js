"use strict";
var r = require("ramda");
var constants_1 = require("../../../constants");
function prepareRecord(record) {
    return r.dissoc(constants_1.default.SPECIAL_KEYS.BUSY, record);
}
exports.prepareRecord = prepareRecord;
