"use strict";
const assertValidStore_1 = require("./assertValidStore");
const common_1 = require("../common");
function commonMap(config, current, record, reducerName) {
    return common_1.default(config, current, record, reducerName, assertValidStore_1.default);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = commonMap;
