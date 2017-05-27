import test from "ava";
import * as td from "testdouble";

import constants from "../../constants";
import reducersFor from "./reducersFor";

const current = [{}];
const user = {};
const error = "";
const config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
const subject = "reducersFor: ";

test(subject + "calls fetchSuccess", function(t) {
  const fetchSuccess = td.function();
  const reducers = reducersFor("users", {}, {fetchSuccess});

  var users = [user];

  reducers(current, {
    records: users,
    type: "USERS_FETCH_SUCCESS"
  });

  td.verify(fetchSuccess(config, current, users, [], undefined));
});

test(subject + "calls fetchSuccess with replace", function(t) {
  const fetchSuccess = td.function();
  const reducers = reducersFor("users", {}, {fetchSuccess});

  var users = [user];

  reducers(current, {
    data: {replace: true},
    records: users,
    type: "USERS_FETCH_SUCCESS"
  });

  td.verify(fetchSuccess(config, current, users, [], true));
});

test(subject + "calls createStart", function(t) {
  const createStart = td.function();
  const reducers = reducersFor("users", {}, {createStart});

  reducers(current, {
    record: user,
    type: "USERS_CREATE_START"
  });

  td.verify(createStart(config, current, user));
});

test(subject + "calls createSuccess", function(t) {
  const createSuccess = td.function();
  const reducers = reducersFor("users", {}, {createSuccess});

  var cid = "abc";

  reducers(current, {
    record: user,
    type: "USERS_CREATE_SUCCESS",
    cid: cid
  });

  td.verify(createSuccess(config, current, user, cid));
});

test(subject + "calls createError", function(t) {
  const createError = td.function();
  const reducers = reducersFor("users", {}, {createError});

  reducers(current, {
    error: error,
    record: user,
    type: "USERS_CREATE_ERROR"
  });

  td.verify(createError(config, current, user));
});

test(subject + "calls updateStart", function(t) {
  const updateStart = td.function();
  const reducers = reducersFor("users", {}, {updateStart});

  reducers(current, {
    record: user,
    type: "USERS_UPDATE_START"
  });

  td.verify(updateStart(config, current, user));
});

test(subject + "calls updateSuccess", function(t) {
  const updateSuccess = td.function();
  const reducers = reducersFor("users", {}, {updateSuccess});

  reducers(current, {
    record: user,
    type: "USERS_UPDATE_SUCCESS"
  });

  td.verify(updateSuccess(config, current, user));
});

test(subject + "calls updateError", function(t) {
  const updateError = td.function();
  const reducers = reducersFor("users", {}, {updateError});

  reducers(current, {
    error: error,
    record: user,
    type: "USERS_UPDATE_ERROR"
  });

  td.verify(updateError(config, current, user));
});

test(subject + "calls deleteStart", function(t) {
  const deleteStart = td.function();
  const reducers = reducersFor("users", {}, {deleteStart});

  reducers(current, {
    record: user,
    type: "USERS_DELETE_START"
  });

  td.verify(deleteStart(config, current, user));
});

test(subject + "calls deleteSuccess", function(t) {
  const deleteSuccess = td.function();
  const reducers = reducersFor("users", {}, {deleteSuccess});

  reducers(current, {
    record: user,
    type: "USERS_DELETE_SUCCESS"
  });

  td.verify(deleteSuccess(config, current, user));
});

test(subject + "calls deleteError", function(t) {
  const deleteError = td.function();
  const reducers = reducersFor("users", {}, {deleteError});

  reducers(current, {
    error: error,
    record: user,
    type: "USERS_DELETE_ERROR"
  });

  td.verify(deleteError(config, current, user));
});

test(subject + "it passes the given key", function(t) {
  const createStart = td.function();
  const reducers = reducersFor("users", {key: "_id"}, {createStart});

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

test(subject + "it doesnt mutate the config", function(t) {
  const config = {};
  reducersFor("users", config);
  reducersFor("monkeys", config);

  t.deepEqual(config, {});
});
