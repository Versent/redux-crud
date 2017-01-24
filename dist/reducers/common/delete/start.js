"use strict";
const r = require("ramda");
function prepareRecord(record) {
    var recordStatus = {
        deleted: true,
        busy: true,
    };
    return r.merge(record, recordStatus);
}
exports.prepareRecord = prepareRecord;
