var actionTypesFor  = require('./actionTypesFor');
var test            = require('ava');
var actionTypes     = actionTypesFor('users');

test('returns the action actionTypes', function(t) {
  t.same(actionTypes.USERS_FETCH_START,   'USERS_FETCH_START');
  t.same(actionTypes.USERS_FETCH_SUCCESS, 'USERS_FETCH_SUCCESS');
  t.same(actionTypes.USERS_FETCH_ERROR,   'USERS_FETCH_ERROR');

  t.same(actionTypes.USERS_UPDATE_START,   'USERS_UPDATE_START');
  t.same(actionTypes.USERS_UPDATE_SUCCESS, 'USERS_UPDATE_SUCCESS');
  t.same(actionTypes.USERS_UPDATE_ERROR,   'USERS_UPDATE_ERROR');

  t.same(actionTypes.USERS_CREATE_START,   'USERS_CREATE_START');
  t.same(actionTypes.USERS_CREATE_SUCCESS, 'USERS_CREATE_SUCCESS');
  t.same(actionTypes.USERS_CREATE_ERROR,   'USERS_CREATE_ERROR');

  t.same(actionTypes.USERS_DELETE_START,   'USERS_DELETE_START');
  t.same(actionTypes.USERS_DELETE_SUCCESS, 'USERS_DELETE_SUCCESS');
  t.same(actionTypes.USERS_DELETE_ERROR,   'USERS_DELETE_ERROR');

  t.end();

});

test('returns aliases', function(t) {
  t.same(actionTypes.fetchStart,   'USERS_FETCH_START');
  t.same(actionTypes.fetchSuccess, 'USERS_FETCH_SUCCESS');
  t.same(actionTypes.fetchError,   'USERS_FETCH_ERROR');

  t.same(actionTypes.updateStart,   'USERS_UPDATE_START');
  t.same(actionTypes.updateSuccess, 'USERS_UPDATE_SUCCESS');
  t.same(actionTypes.updateError,   'USERS_UPDATE_ERROR');

  t.same(actionTypes.createStart,   'USERS_CREATE_START');
  t.same(actionTypes.createSuccess, 'USERS_CREATE_SUCCESS');
  t.same(actionTypes.createError,   'USERS_CREATE_ERROR');

  t.same(actionTypes.deleteStart,   'USERS_DELETE_START');
  t.same(actionTypes.deleteSuccess, 'USERS_DELETE_SUCCESS');
  t.same(actionTypes.deleteError,   'USERS_DELETE_ERROR');

  t.end();
});
