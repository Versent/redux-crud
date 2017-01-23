"use strict";
function assertHasKey(config, scope, record) {
    var key = config.key;
    if (record[key] == null) {
        throw new Error(scope + ": Expected record to have ." + key);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = assertHasKey;
