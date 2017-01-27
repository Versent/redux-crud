"use strict";
var r = require("ramda");
/*
Adds or replace one record
*/
function replace(config, current, record) {
    var key = config.key;
    var recordKey = record[key];
    return r.merge(current, (_a = {}, _a[recordKey] = record, _a));
    var _a;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = replace;
