var test            = require('tape-catch');
var rewire          = require("rewire");
var reducersFor     = rewire('../lib/reducersFor.js');
var sinon           = require('sinon');
var reducers        = reducersFor('users');
var current         = [1];
var users           = [2];
var error           = '';
var config          = {
  key: 'id',
  resourceName: 'users',
}

test('calls fetchSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('fetchSuccess', stub);

  reducers(current, {
    type: 'USERS_FETCH_SUCCESS',
    users: users
  });

  t.ok(stub.calledWith(config, current, users), 'calls fetchSuccess');
  t.end();
});

test('calls createStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createStart', stub);

  reducers(current, {
    type: 'USERS_CREATE_START',
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});


test('calls createSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createSuccess', stub);

  reducers(current, {
    type: 'USERS_CREATE_SUCCESS',
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});

test('calls createError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createError', stub);

  reducers(current, {
    type: 'USERS_CREATE_ERROR',
    error: error,
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});

test('calls updateStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateStart', stub);

  reducers(current, {
    type: 'USERS_UPDATE_START',
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});


test('calls updateSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateSuccess', stub);

  reducers(current, {
    type: 'USERS_UPDATE_SUCCESS',
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});

test('calls updateError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateError', stub);

  reducers(current, {
    type: 'USERS_UPDATE_ERROR',
    error: error,
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});

test('calls deleteStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteStart', stub);

  reducers(current, {
    type: 'USERS_DELETE_START',
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});


test('calls deleteSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteSuccess', stub);

  reducers(current, {
    type: 'USERS_DELETE_SUCCESS',
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});

test('calls deleteError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteError', stub);

  reducers(current, {
    type: 'USERS_DELETE_ERROR',
    error: error,
    users: users,
  });

  t.ok(stub.calledWith(config, current, users))
  t.end();
});

test('it passes the given key', function(t) {
  var reducers = reducersFor('users', {key: '_id'});
  var stub = sinon.stub();
  reducersFor.__set__('fetchSuccess', stub);

  reducers(current, {
    type: 'USERS_FETCH_SUCCESS',
    users: users
  });

  var config = {
    key: '_id',
    resourceName: 'users',
  }

  t.ok(stub.calledWith(config, current, users), 'calls fetchSuccess');
  t.end();
});

