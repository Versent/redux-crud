"use strict";
const constants_1 = require("../constants");
const store_1 = require("./list/store");
const store_2 = require("./map/store");
function getStore(config) {
    if (config.store === constants_1.default.STORE_MAP) {
        return store_2.default;
    }
    else {
        return store_1.default;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getStore;
