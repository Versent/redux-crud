"use strict";
const ava_1 = require("ava");
const actionCreatorsFor_1 = require("./actionCreatorsFor");
const error = {};
const actionCreators = actionCreatorsFor_1.default("users");
const subject = " actionCreatorsFor: ";
const arrayRegEx = /Expected record not to be an array/;
function makeUser() {
    return {
        id: 11
    };
}
function makeUsers() {
    return [makeUser()];
}
ava_1.default(subject + "returns the actionCreators", function (t) {
    t.truthy(actionCreators.fetchStart);
    t.truthy(actionCreators.fetchSuccess);
    t.truthy(actionCreators.fetchError);
    t.truthy(actionCreators.createStart);
    t.truthy(actionCreators.createSuccess);
    t.truthy(actionCreators.createError);
    t.truthy(actionCreators.updateStart);
    t.truthy(actionCreators.updateSuccess);
    t.truthy(actionCreators.updateError);
    t.truthy(actionCreators.deleteStart);
    t.truthy(actionCreators.deleteSuccess);
    t.truthy(actionCreators.deleteError);
});
ava_1.default(subject + "fetchStart", function (t) {
    var data = { foo: 1 };
    var action = actionCreators.fetchStart(data);
    t.deepEqual(action.type, "USERS_FETCH_START");
    t.deepEqual(action.data, data, "has the data");
});
ava_1.default(subject + "fetchSuccess", function (t) {
    var data = { foo: 1 };
    var users = makeUsers();
    var action = actionCreators.fetchSuccess(users, data);
    t.deepEqual(action.type, "USERS_FETCH_SUCCESS");
    t.deepEqual(action.records, users, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.fetchSuccess();
    }
    t.throws(withoutPayload, /Expected records/);
});
ava_1.default(subject + "fetchError", function (t) {
    var data = { foo: 1 };
    var action = actionCreators.fetchError(error, data);
    t.deepEqual(action.type, "USERS_FETCH_ERROR");
    t.deepEqual(action.error, error, "has the error");
    t.deepEqual(action.data, data, "has the data");
});
ava_1.default(subject + "createStart", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.createStart(user, data);
    t.deepEqual(action.type, "USERS_CREATE_START");
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.createStart();
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects single record
    function withArray() {
        actionCreators.createStart([]);
    }
    t.throws(withArray, arrayRegEx);
    // it expects a key on the record
    function withoutKey() {
        var user = {};
        actionCreators.createStart(user);
    }
    t.throws(withoutKey, /Expected record\.id in createStart/);
});
ava_1.default(subject + "createSuccess", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.createSuccess(user, "abc", data);
    t.deepEqual(action.type, "USERS_CREATE_SUCCESS");
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.cid, "abc", "has the cid");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.createSuccess();
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects one
    function withArray() {
        actionCreators.createSuccess([]);
    }
    t.throws(withArray, arrayRegEx);
});
ava_1.default(subject + "createError", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.createError(error, user, data);
    t.deepEqual(action.type, "USERS_CREATE_ERROR");
    t.deepEqual(action.error, error);
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.createError(error);
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects single record
    function withArray() {
        actionCreators.createError(error, []);
    }
    t.throws(withArray, arrayRegEx);
    function withoutKey() {
        var user = {};
        actionCreators.createError(error, user);
    }
    t.throws(withoutKey, /Expected record\.id in createError/);
});
ava_1.default(subject + "updateStart", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.updateStart(user, data);
    t.deepEqual(action.type, "USERS_UPDATE_START");
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.updateStart();
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects one
    function withArray() {
        actionCreators.updateStart([]);
    }
    t.throws(withArray, arrayRegEx);
});
ava_1.default(subject + "updateSuccess", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.updateSuccess(user, data);
    t.deepEqual(action.type, "USERS_UPDATE_SUCCESS");
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.updateSuccess();
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects one
    function withArray() {
        actionCreators.updateSuccess([]);
    }
    t.throws(withArray, arrayRegEx);
});
ava_1.default(subject + "updateError", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.updateError(error, user, data);
    t.deepEqual(action.type, "USERS_UPDATE_ERROR");
    t.deepEqual(action.error, error);
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.updateError(error);
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects one
    function withArray() {
        actionCreators.updateError(error, []);
    }
    t.throws(withArray, arrayRegEx);
});
ava_1.default(subject + "deleteStart", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.deleteStart(user, data);
    t.deepEqual(action.type, "USERS_DELETE_START");
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.deleteStart();
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects one
    function withArray() {
        actionCreators.deleteStart([]);
    }
    t.throws(withArray, arrayRegEx);
});
ava_1.default(subject + "deleteSuccess", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.deleteSuccess(user, data);
    t.deepEqual(action.type, "USERS_DELETE_SUCCESS");
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.deleteSuccess();
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects one
    function withArray() {
        actionCreators.deleteSuccess([]);
    }
    t.throws(withArray, arrayRegEx);
});
ava_1.default(subject + "deleteError", function (t) {
    var user = makeUser();
    var data = { foo: 1 };
    var action = actionCreators.deleteError(error, user, data);
    t.deepEqual(action.type, "USERS_DELETE_ERROR");
    t.deepEqual(action.error, error);
    t.deepEqual(action.record, user, "has the user");
    t.deepEqual(action.data, data, "has the data");
    function withoutPayload() {
        actionCreators.deleteError(error);
    }
    t.throws(withoutPayload, /Expected record/);
    // it expects one
    function withArray() {
        actionCreators.deleteError(error, []);
    }
    t.throws(withArray, arrayRegEx);
});
