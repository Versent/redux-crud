"use strict";
const reducersFor_1 = require("../common/reducersFor");
const error_1 = require("./create/error");
const start_1 = require("./create/start");
const success_1 = require("./create/success");
const error_2 = require("./delete/error");
const start_2 = require("./delete/start");
const success_2 = require("./delete/success");
const success_3 = require("./fetch/success");
const error_3 = require("./update/error");
const start_3 = require("./update/start");
const success_4 = require("./update/success");
const r = require("ramda");
const baseReducers = {
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
function reducersFor(resourceName, args = {}, deps) {
    const reducers = r.merge(baseReducers, deps);
    return reducersFor_1.default(resourceName, args, [], reducers);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducersFor;
