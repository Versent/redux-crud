"use strict";
var r = require("ramda");
function remove(config, current, record) {
    var key = config.key;
    var recordKey = record[key];
    return r.omit([recordKey], current);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = remove;
