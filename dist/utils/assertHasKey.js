"use strict";
const makeScope_1 = require("../utils/makeScope");
function assertHasKey(config, reducerName, record) {
    var key = config.key;
    var scope = makeScope_1.default(config, reducerName);
    if (record[key] == null) {
        throw new Error(scope + ": Expected record to have ." + key);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assertHasKey;
