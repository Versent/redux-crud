"use strict";
function default_1(config, reducerName, record) {
    function throwErr() {
        throw new Error(reducerName + ': Expected to record to have ' + config.key);
    }
    if (record[config.key] == null) {
        throwErr();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
