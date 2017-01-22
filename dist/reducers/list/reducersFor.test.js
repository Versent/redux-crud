"use strict";
const ava_1 = require("ava");
const td = require("testdouble");
const constants_1 = require("../../constants");
const reducersFor_1 = require("./reducersFor");
const current = [{}];
const user = {};
const error = '';
const config = {
    key: constants_1.default.DEFAULT_KEY,
    resourceName: 'users',
};
const subject = 'reducersFor: ';
ava_1.default(subject + 'calls fetchSuccess', function (t) {
    const fetchSuccess = td.function();
    const reducers = reducersFor_1.default('users', {}, { fetchSuccess });
    var users = [user];
    reducers(current, {
        records: users,
        type: 'USERS_FETCH_SUCCESS',
    });
    td.verify(fetchSuccess(config, current, users));
});
ava_1.default(subject + 'calls createStart', function (t) {
    const createStart = td.function();
    const reducers = reducersFor_1.default('users', {}, { createStart });
    reducers(current, {
        record: user,
        type: 'USERS_CREATE_START',
    });
    td.verify(createStart(config, current, user));
});
ava_1.default(subject + 'calls createSuccess', function (t) {
    const createSuccess = td.function();
    const reducers = reducersFor_1.default('users', {}, { createSuccess });
    var cid = 'abc';
    reducers(current, {
        record: user,
        type: 'USERS_CREATE_SUCCESS',
        cid: cid,
    });
    td.verify(createSuccess(config, current, user, cid));
});
ava_1.default(subject + 'calls createError', function (t) {
    const createError = td.function();
    const reducers = reducersFor_1.default('users', {}, { createError });
    reducers(current, {
        error: error,
        record: user,
        type: 'USERS_CREATE_ERROR',
    });
    td.verify(createError(config, current, user));
});
ava_1.default(subject + 'calls updateStart', function (t) {
    const updateStart = td.function();
    const reducers = reducersFor_1.default('users', {}, { updateStart });
    reducers(current, {
        record: user,
        type: 'USERS_UPDATE_START',
    });
    td.verify(updateStart(config, current, user));
});
ava_1.default(subject + 'calls updateSuccess', function (t) {
    const updateSuccess = td.function();
    const reducers = reducersFor_1.default('users', {}, { updateSuccess });
    reducers(current, {
        record: user,
        type: 'USERS_UPDATE_SUCCESS',
    });
    td.verify(updateSuccess(config, current, user));
});
ava_1.default(subject + 'calls updateError', function (t) {
    const updateError = td.function();
    const reducers = reducersFor_1.default('users', {}, { updateError });
    reducers(current, {
        error: error,
        record: user,
        type: 'USERS_UPDATE_ERROR',
    });
    td.verify(updateError(config, current, user));
});
ava_1.default(subject + 'calls deleteStart', function (t) {
    const deleteStart = td.function();
    const reducers = reducersFor_1.default('users', {}, { deleteStart });
    reducers(current, {
        record: user,
        type: 'USERS_DELETE_START',
    });
    td.verify(deleteStart(config, current, user));
});
ava_1.default(subject + 'calls deleteSuccess', function (t) {
    const deleteSuccess = td.function();
    const reducers = reducersFor_1.default('users', {}, { deleteSuccess });
    reducers(current, {
        record: user,
        type: 'USERS_DELETE_SUCCESS',
    });
    td.verify(deleteSuccess(config, current, user));
});
ava_1.default(subject + 'calls deleteError', function (t) {
    const deleteError = td.function();
    const reducers = reducersFor_1.default('users', {}, { deleteError });
    reducers(current, {
        error: error,
        record: user,
        type: 'USERS_DELETE_ERROR',
    });
    td.verify(deleteError(config, current, user));
});
ava_1.default(subject + 'it passes the given key', function (t) {
    const createStart = td.function();
    const reducers = reducersFor_1.default('users', { key: '_id' }, { createStart });
    reducers(current, {
        record: user,
        type: 'USERS_CREATE_START',
    });
    var expectedConfig = {
        key: '_id',
        resourceName: 'users',
    };
    td.verify(createStart(expectedConfig, current, user));
});
ava_1.default(subject + 'it doesnt mutate the config', function (t) {
    const config = {};
    reducersFor_1.default('users', config);
    reducersFor_1.default('monkeys', config);
    t.deepEqual(config, {});
});
