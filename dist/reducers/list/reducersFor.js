"use strict";
var reducersFor_1 = require("../common/reducersFor");
var error_1 = require("./create/error");
var start_1 = require("./create/start");
var success_1 = require("./create/success");
var error_2 = require("./delete/error");
var start_2 = require("./delete/start");
var success_2 = require("./delete/success");
var success_3 = require("./fetch/success");
var error_3 = require("./update/error");
var start_3 = require("./update/start");
var success_4 = require("./update/success");
var r = require("ramda");
var baseReducers = {
    createError: error_1.default,
    createStart: start_1.default,
    createSuccess: success_1.default,
    deleteError: error_2.default,
    deleteStart: start_2.default,
    deleteSuccess: success_2.default,
    fetchSuccess: success_3.default,
    updateError: error_3.default,
    updateStart: start_3.default,
    updateSuccess: success_4.default,
};
function reducersFor(resourceName, args, deps) {
    if (args === void 0) { args = {}; }
    var reducers = r.merge(baseReducers, deps);
    return reducersFor_1.default(resourceName, args, [], reducers);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducersFor;
