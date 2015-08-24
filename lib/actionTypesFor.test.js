var actionTypesFor  = require('./actionTypesFor');
var test            = require('tape-catch');
var actionTypes     = actionTypesFor('users');

test('returns the action actionTypes', function(t) {
  t.equal(actionTypes.USERS_FETCH_START,   'USERS_FETCH_START');
  t.equal(actionTypes.USERS_FETCH_SUCCESS, 'USERS_FETCH_SUCCESS');
  t.equal(actionTypes.USERS_FETCH_ERROR,   'USERS_FETCH_ERROR');

  t.equal(actionTypes.USERS_UPDATE_START,   'USERS_UPDATE_START');
  t.equal(actionTypes.USERS_UPDATE_SUCCESS, 'USERS_UPDATE_SUCCESS');
  t.equal(actionTypes.USERS_UPDATE_ERROR,   'USERS_UPDATE_ERROR');

  t.equal(actionTypes.USERS_CREATE_START,   'USERS_CREATE_START');
  t.equal(actionTypes.USERS_CREATE_SUCCESS, 'USERS_CREATE_SUCCESS');
  t.equal(actionTypes.USERS_CREATE_ERROR,   'USERS_CREATE_ERROR');

  t.equal(actionTypes.USERS_DELETE_START,   'USERS_DELETE_START');
  t.equal(actionTypes.USERS_DELETE_SUCCESS, 'USERS_DELETE_SUCCESS');
  t.equal(actionTypes.USERS_DELETE_ERROR,   'USERS_DELETE_ERROR');

  t.end();

});

test('returns aliases', function(t) {
  t.equal(actionTypes.fetchStart,   'USERS_FETCH_START');
  t.equal(actionTypes.fetchSuccess, 'USERS_FETCH_SUCCESS');
  t.equal(actionTypes.fetchError,   'USERS_FETCH_ERROR');

  t.equal(actionTypes.updateStart,   'USERS_UPDATE_START');
  t.equal(actionTypes.updateSuccess, 'USERS_UPDATE_SUCCESS');
  t.equal(actionTypes.updateError,   'USERS_UPDATE_ERROR');

  t.equal(actionTypes.createStart,   'USERS_CREATE_START');
  t.equal(actionTypes.createSuccess, 'USERS_CREATE_SUCCESS');
  t.equal(actionTypes.createError,   'USERS_CREATE_ERROR');

  t.equal(actionTypes.deleteStart,   'USERS_DELETE_START');
  t.equal(actionTypes.deleteSuccess, 'USERS_DELETE_SUCCESS');
  t.equal(actionTypes.deleteError,   'USERS_DELETE_ERROR');

  t.end();
});
