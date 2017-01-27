"use strict";
var r = require("ramda");
var wrapArray_1 = require("../../utils/wrapArray");
function assertHasKey(config, scope, recordOrRecords) {
    var key = config.key;
    var records = wrapArray_1.default(recordOrRecords);
    r.forEach(function (record) {
        if (record[key] == null) {
            throw new Error(scope + ": Expected record to have ." + key);
        }
    })(records);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assertHasKey;
