"use strict";
const actionTypesFor_1 = require("./actionTypesFor");
const constants_1 = require("./constants");
const error_1 = require("./reducers/create/error");
const start_1 = require("./reducers/create/start");
const success_1 = require("./reducers/create/success");
const error_2 = require("./reducers/delete/error");
const start_2 = require("./reducers/delete/start");
const success_2 = require("./reducers/delete/success");
const success_3 = require("./reducers/fetch/success");
const error_3 = require("./reducers/update/error");
const start_3 = require("./reducers/update/start");
const success_4 = require("./reducers/update/success");
const assign = require('lodash.assign');
function emptyState(config) {
    return [];
}
const defaultDeps = {
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
    if (resourceName == null)
        throw new Error('reducersFor: Expected resourceName');
    args = args || {};
    deps = assign(defaultDeps, deps);
    var defaults = {
        key: constants_1.default.DEFAULT_KEY,
        resourceName: resourceName,
    };
    var config = assign(defaults, args);
    return function reducers(state, action) {
        state = state || emptyState(config);
        if (action == null)
            throw new Error(resourceName + ' reducers: Expected action');
        var actionTypes = actionTypesFor_1.default(resourceName);
        var record = action.record;
        switch (action.type) {
            case actionTypes.fetchSuccess:
                return deps.fetchSuccess(config, state, action.records);
            case actionTypes.createStart:
                return deps.createStart(config, state, record);
            case actionTypes.createSuccess:
                return deps.createSuccess(config, state, record, action.cid);
            case actionTypes.createError:
                return deps.createError(config, state, record);
            case actionTypes.updateStart:
                return deps.updateStart(config, state, record);
            case actionTypes.updateSuccess:
                return deps.updateSuccess(config, state, record);
            case actionTypes.updateError:
                return deps.updateError(config, state, record);
            case actionTypes.deleteStart:
                return deps.deleteStart(config, state, record);
            case actionTypes.deleteSuccess:
                return deps.deleteSuccess(config, state, record);
            case actionTypes.deleteError:
                return deps.deleteError(config, state, record);
            default:
                return state;
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = reducersFor;
