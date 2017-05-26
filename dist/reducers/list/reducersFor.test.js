"use strict";
var ava_1 = require("ava");
var td = require("testdouble");
var constants_1 = require("../../constants");
var reducersFor_1 = require("./reducersFor");
var current = [{}];
var user = {};
var error = "";
var config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: "users"
};
var subject = "reducersFor: ";
ava_1.default(subject + "calls fetchSuccess", function (t) {
    var fetchSuccess = td.function();
    var reducers = reducersFor_1.default("users", {}, { fetchSuccess: fetchSuccess });
    var users = [user];
    reducers(current, {
        records: users,
        type: "USERS_FETCH_SUCCESS"
    });
    td.verify(fetchSuccess(config, current, users, [], undefined));
});
ava_1.default(subject + "calls fetchSuccess with replace", function (t) {
    var fetchSuccess = td.function();
    var reducers = reducersFor_1.default("users", {}, { fetchSuccess: fetchSuccess });
    var users = [user];
    reducers(current, {
        data: { replace: true },
        records: users,
        type: "USERS_FETCH_SUCCESS"
    });
    td.verify(fetchSuccess(config, current, users, [], true));
});
ava_1.default(subject + "calls createStart", function (t) {
    var createStart = td.function();
    var reducers = reducersFor_1.default("users", {}, { createStart: createStart });
    reducers(current, {
        record: user,
        type: "USERS_CREATE_START"
    });
    td.verify(createStart(config, current, user));
});
ava_1.default(subject + "calls createSuccess", function (t) {
    var createSuccess = td.function();
    var reducers = reducersFor_1.default("users", {}, { createSuccess: createSuccess });
    var cid = "abc";
    reducers(current, {
        record: user,
        type: "USERS_CREATE_SUCCESS",
        cid: cid
    });
    td.verify(createSuccess(config, current, user, cid));
});
ava_1.default(subject + "calls createError", function (t) {
    var createError = td.function();
    var reducers = reducersFor_1.default("users", {}, { createError: createError });
    reducers(current, {
        error: error,
        record: user,
        type: "USERS_CREATE_ERROR"
    });
    td.verify(createError(config, current, user));
});
ava_1.default(subject + "calls updateStart", function (t) {
    var updateStart = td.function();
    var reducers = reducersFor_1.default("users", {}, { updateStart: updateStart });
    reducers(current, {
        record: user,
        type: "USERS_UPDATE_START"
    });
    td.verify(updateStart(config, current, user));
});
ava_1.default(subject + "calls updateSuccess", function (t) {
    var updateSuccess = td.function();
    var reducers = reducersFor_1.default("users", {}, { updateSuccess: updateSuccess });
    reducers(current, {
        record: user,
        type: "USERS_UPDATE_SUCCESS"
    });
    td.verify(updateSuccess(config, current, user));
});
ava_1.default(subject + "calls updateError", function (t) {
    var updateError = td.function();
    var reducers = reducersFor_1.default("users", {}, { updateError: updateError });
    reducers(current, {
        error: error,
        record: user,
        type: "USERS_UPDATE_ERROR"
    });
    td.verify(updateError(config, current, user));
});
ava_1.default(subject + "calls deleteStart", function (t) {
    var deleteStart = td.function();
    var reducers = reducersFor_1.default("users", {}, { deleteStart: deleteStart });
    reducers(current, {
        record: user,
        type: "USERS_DELETE_START"
    });
    td.verify(deleteStart(config, current, user));
});
ava_1.default(subject + "calls deleteSuccess", function (t) {
    var deleteSuccess = td.function();
    var reducers = reducersFor_1.default("users", {}, { deleteSuccess: deleteSuccess });
    reducers(current, {
        record: user,
        type: "USERS_DELETE_SUCCESS"
    });
    td.verify(deleteSuccess(config, current, user));
});
ava_1.default(subject + "calls deleteError", function (t) {
    var deleteError = td.function();
    var reducers = reducersFor_1.default("users", {}, { deleteError: deleteError });
    reducers(current, {
        error: error,
        record: user,
        type: "USERS_DELETE_ERROR"
    });
    td.verify(deleteError(config, current, user));
});
ava_1.default(subject + "it passes the given key", function (t) {
    var createStart = td.function();
    var reducers = reducersFor_1.default("users", { key: "_id" }, { createStart: createStart });
    reducers(current, {
        record: user,
        type: "USERS_CREATE_START"
    });
    var expectedConfig = {
        key: "_id",
        resourceName: "users"
    };
    td.verify(createStart(expectedConfig, current, user));
});
ava_1.default(subject + "it doesnt mutate the config", function (t) {
    var config = {};
    reducersFor_1.default("users", config);
    reducersFor_1.default("monkeys", config);
    t.deepEqual(config, {});
});
