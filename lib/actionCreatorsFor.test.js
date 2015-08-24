var test              = require('tape-catch');
var actionCreatorsFor = require('./actionCreatorsFor');

var user              = {};
var users             = [user];
var error             = {};
var actionCreators    = actionCreatorsFor('users');
var subject           =' actionCreatorsFor: ';

test(subject + 'returns the actionCreators', function(t) {

  t.ok(actionCreators.fetchStart);
  t.ok(actionCreators.fetchSuccess);
  t.ok(actionCreators.fetchError);

  t.ok(actionCreators.createStart);
  t.ok(actionCreators.createSuccess);
  t.ok(actionCreators.createError);

  t.ok(actionCreators.updateStart);
  t.ok(actionCreators.updateSuccess);
  t.ok(actionCreators.updateError);

  t.ok(actionCreators.deleteStart);
  t.ok(actionCreators.deleteSuccess);
  t.ok(actionCreators.deleteError);

  t.end();
});

test(subject + 'fetchStart', function(t) {
  var action = actionCreators.fetchStart(user);
  t.equal(action.type, 'USERS_FETCH_START');

  t.end();
});

test(subject + 'fetchSuccess', function(t) {
  var action = actionCreators.fetchSuccess(users);
  t.equal(action.type, 'USERS_FETCH_SUCCESS');
  t.equal(action.records, users, 'has the user');

  t.end();
});

test(subject + 'fetchError', function(t) {
  var action = actionCreators.fetchError(error);
  t.equal(action.type, 'USERS_FETCH_ERROR');
  t.equal(action.error, error);

  t.end();
});

test(subject + 'createStart', function(t) {
  var action = actionCreators.createStart(user);
  t.equal(action.type, 'USERS_CREATE_START');
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.createStart(users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'createSuccess', function(t) {
  var action = actionCreators.createSuccess(user);
  t.equal(action.type, 'USERS_CREATE_SUCCESS');
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.createSuccess(users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'createError', function(t) {
  var action = actionCreators.createError(error, user);
  t.equal(action.type, 'USERS_CREATE_ERROR');
  t.equal(action.error, error);
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.createError(error, users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'updateStart', function(t) {
  var action = actionCreators.updateStart(user);
  t.equal(action.type, 'USERS_UPDATE_START');
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.updateStart(users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'updateSuccess', function(t) {
  var action = actionCreators.updateSuccess(user);
  t.equal(action.type, 'USERS_UPDATE_SUCCESS');
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.updateSuccess(users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'updateError', function(t) {
  var action = actionCreators.updateError(error, user);
  t.equal(action.type, 'USERS_UPDATE_ERROR');
  t.equal(action.error, error);
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.updateError(error, users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'deleteStart', function(t) {
  var action = actionCreators.deleteStart(user);
  t.equal(action.type, 'USERS_DELETE_START');
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.deleteStart(users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'deleteSuccess', function(t) {
  var action = actionCreators.deleteSuccess(user);
  t.equal(action.type, 'USERS_DELETE_SUCCESS');
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.deleteSuccess(users);
  }
  t.throws(fn, 'expects one');

  t.end();
});

test(subject + 'deleteError', function(t) {
  var action = actionCreators.deleteError(error, user);
  t.equal(action.type, 'USERS_DELETE_ERROR');
  t.equal(action.error, error);
  t.equal(action.record, user, 'has the user');

  // it expects one
  function fn() {
    actionCreators.deleteError(error, users);
  }
  t.throws(fn, 'expects one');

  t.end();
});
