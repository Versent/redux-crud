"use strict";
const r = require("ramda");
function prepareRecord(record) {
    var recordStatus = {
        busy: true,
        pendingUpdate: true,
    };
    return r.merge(record, recordStatus);
}
exports.prepareRecord = prepareRecord;
