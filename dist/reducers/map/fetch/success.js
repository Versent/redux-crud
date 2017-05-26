"use strict";
var r = require("ramda");
var assertAllHaveKeys_1 = require("../../../utils/assertAllHaveKeys");
var constants_1 = require("../../../constants");
var invariants_1 = require("../invariants");
var wrapArray_1 = require("../../../utils/wrapArray");
var reducerName = constants_1.default.REDUCER_NAMES.FETCH_SUCCESS;
var invariantArgs = {
    reducerName: reducerName,
    canBeArray: true
};
function success(config, current, records, emptyState, replace) {
    if (replace === void 0) { replace = false; }
    invariants_1.default(invariantArgs, config, current, records);
    // wrap array
    records = wrapArray_1.default(records);
    // All given records must have a key
    assertAllHaveKeys_1.default(config, reducerName, records);
    var merge = r.indexBy(r.prop(config.key), records);
    return r.merge(replace ? emptyState : current, merge);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = success;
