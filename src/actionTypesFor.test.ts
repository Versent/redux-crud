import actionTypesFor from "./actionTypesFor";
import test from "ava";

const actionTypes = actionTypesFor("users");

test("returns the action actionTypes", function(t) {
  t.deepEqual(actionTypes.USERS_FETCH_START, "USERS_FETCH_START");
  t.deepEqual(actionTypes.USERS_FETCH_SUCCESS, "USERS_FETCH_SUCCESS");
  t.deepEqual(actionTypes.USERS_FETCH_ERROR, "USERS_FETCH_ERROR");

  t.deepEqual(actionTypes.USERS_UPDATE_START, "USERS_UPDATE_START");
  t.deepEqual(actionTypes.USERS_UPDATE_SUCCESS, "USERS_UPDATE_SUCCESS");
  t.deepEqual(actionTypes.USERS_UPDATE_ERROR, "USERS_UPDATE_ERROR");

  t.deepEqual(actionTypes.USERS_CREATE_START, "USERS_CREATE_START");
  t.deepEqual(actionTypes.USERS_CREATE_SUCCESS, "USERS_CREATE_SUCCESS");
  t.deepEqual(actionTypes.USERS_CREATE_ERROR, "USERS_CREATE_ERROR");

  t.deepEqual(actionTypes.USERS_DELETE_START, "USERS_DELETE_START");
  t.deepEqual(actionTypes.USERS_DELETE_SUCCESS, "USERS_DELETE_SUCCESS");
  t.deepEqual(actionTypes.USERS_DELETE_ERROR, "USERS_DELETE_ERROR");
});

test("returns aliases", function(t) {
  t.deepEqual(actionTypes.fetchStart, "USERS_FETCH_START");
  t.deepEqual(actionTypes.fetchSuccess, "USERS_FETCH_SUCCESS");
  t.deepEqual(actionTypes.fetchError, "USERS_FETCH_ERROR");

  t.deepEqual(actionTypes.updateStart, "USERS_UPDATE_START");
  t.deepEqual(actionTypes.updateSuccess, "USERS_UPDATE_SUCCESS");
  t.deepEqual(actionTypes.updateError, "USERS_UPDATE_ERROR");

  t.deepEqual(actionTypes.createStart, "USERS_CREATE_START");
  t.deepEqual(actionTypes.createSuccess, "USERS_CREATE_SUCCESS");
  t.deepEqual(actionTypes.createError, "USERS_CREATE_ERROR");

  t.deepEqual(actionTypes.deleteStart, "USERS_DELETE_START");
  t.deepEqual(actionTypes.deleteSuccess, "USERS_DELETE_SUCCESS");
  t.deepEqual(actionTypes.deleteError, "USERS_DELETE_ERROR");
});
