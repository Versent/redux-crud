"use strict";
var r = require("ramda");
function prepareRecord(record) {
    return r.omit(["busy"], record);
}
exports.prepareRecord = prepareRecord;
