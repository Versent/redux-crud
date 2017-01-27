"use strict";
var invariants_1 = require("../invariants");
var store_1 = require("./store");
function invariantsList(invariantArgs, config, current, record) {
    var extra = {
        assertValidStore: store_1.default.assert,
        config: config,
        current: current,
        record: record,
    };
    invariants_1.default(invariantArgs, extra);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = invariantsList;
