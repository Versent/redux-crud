"use strict";
const r = require("ramda");
/*
Adds or replace one record
*/
function replace(config, current, record) {
    var key = config.key;
    var recordKey = record[key];
    return r.merge(current, { [recordKey]: record });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = replace;
