"use strict";
const r = require("ramda");
function prepareRecord(record) {
    var recordStatus = {
        busy: true,
        pendingCreate: true,
    };
    return r.merge(record, recordStatus);
}
exports.prepareRecord = prepareRecord;
