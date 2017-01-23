"use strict";
const invariants_1 = require("../invariants");
const store_1 = require("./store");
function invariantsList(invariantArgs, config, current, record) {
    var extra = {
        assertValidStore: store_1.default.assert,
        config,
        current,
        record,
    };
    invariants_1.default(invariantArgs, extra);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invariantsList;
