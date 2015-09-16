var test            = require('ava');
var rewire          = require("rewire");
var reducersFor     = rewire('../lib/reducersFor.js');
var sinon           = require('sinon');
var reducers        = reducersFor('users');
var current         = [{}];
var user            = {};
var error           = '';
var config          = {
  key: 'id',
  resourceName: 'users',
}
var subject = 'reducersFor: ';

test(subject + 'calls fetchSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('fetchSuccess', stub);

  var users = [user];

  reducers(current, {
    records: users,
    type:   'USERS_FETCH_SUCCESS',
  });

  t.ok(stub.calledWith(config, current, users), 'calls fetchSuccess');
  t.end();
});

test(subject + 'calls createStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createStart', stub);

  reducers(current, {
    record: user,
    type: 'USERS_CREATE_START',
  });

  t.ok(stub.calledWith(config, current, user))
  t.end();
});


test(subject + 'calls createSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createSuccess', stub);

  var cid = 'abc';

  reducers(current, {
    record: user,
    type: 'USERS_CREATE_SUCCESS',
    cid:  cid,
  });

  t.ok(stub.calledWith(config, current, user, cid));
  t.end();
});

test(subject + 'calls createError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createError', stub);

  reducers(current, {
    error: error,
    record: user,
    type: 'USERS_CREATE_ERROR',
  });

  t.ok(stub.calledWith(config, current, user))
  t.end();
});

test(subject + 'calls updateStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateStart', stub);

  reducers(current, {
    record: user,
    type: 'USERS_UPDATE_START',
  });

  t.ok(stub.calledWith(config, current, user))
  t.end();
});


test(subject + 'calls updateSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateSuccess', stub);

  reducers(current, {
    record: user,
    type: 'USERS_UPDATE_SUCCESS',
  });

  t.ok(stub.calledWith(config, current, user))
  t.end();
});

test(subject + 'calls updateError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateError', stub);

  reducers(current, {
    error: error,
    record: user,
    type: 'USERS_UPDATE_ERROR',
  });

  t.ok(stub.calledWith(config, current, user))
  t.end();
});

test(subject + 'calls deleteStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteStart', stub);

  reducers(current, {
    record: user,
    type: 'USERS_DELETE_START',
  });

  t.ok(stub.calledWith(config, current, user))
  t.end();
});


test(subject + 'calls deleteSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteSuccess', stub);

  reducers(current, {
    record: user,
    type: 'USERS_DELETE_SUCCESS',
  });

  t.ok(stub.calledWith(config, current, user))
  t.end();
});

test(subject + 'calls deleteError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteError', stub);

  reducers(current, {
    error: error,
    record: user,
    type: 'USERS_DELETE_ERROR',
  });

  t.ok(stub.calledWith(config, current, user));
  t.end();
});

test(subject + 'it passes the given key', function(t) {
  var reducers = reducersFor('users', {key: '_id'});
  var stub = sinon.stub();
  reducersFor.__set__('createStart', stub);

  reducers(current, {
    record: user,
    type:  'USERS_CREATE_START',
  });

  var expectedConfig = {
    key: '_id',
    resourceName: 'users',
  }

  t.ok(stub.calledWith(expectedConfig, current, user), 'calls createStart');
  t.end();
});
