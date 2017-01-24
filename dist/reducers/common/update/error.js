"use strict";
const r = require("ramda");
function prepareRecord(record) {
    return r.omit(["busy"], record);
}
exports.prepareRecord = prepareRecord;
