var test            = require('ava');
var constants       = require('../constants');
var rewire          = require("rewire");
var reducersFor     = rewire('../lib/reducersFor.js');
var sinon           = require('sinon');
var reducers        = reducersFor('users');
var current         = [{}];
var user            = {};
var error           = '';
var config          = {
  key: constants.DEFAULT_KEY,
  resourceName: 'users',
  store: constants.STORE_SI,
};
var subject = 'reducersFor: ';

test(subject + 'calls fetchSuccess', function(t) {
  var stub = sinon.stub();

  reducersFor.__set__('fetchSuccess', stub);

  var users = [user];

  reducers(current, {
    records: users,
    type:   'USERS_FETCH_SUCCESS',
  });
  t.truthy(stub.calledWith(config, current, users), 'calls fetchSuccess');
  
});

test(subject + 'calls createStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createStart', stub);

  reducers(current, {
    record: user,
    type: 'USERS_CREATE_START',
  });

  t.truthy(stub.calledWith(config, current, user))
  
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

  t.truthy(stub.calledWith(config, current, user, cid));
  
});

test(subject + 'calls createError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('createError', stub);

  reducers(current, {
    error: error,
    record: user,
    type: 'USERS_CREATE_ERROR',
  });

  t.truthy(stub.calledWith(config, current, user))
  
});

test(subject + 'calls updateStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateStart', stub);

  reducers(current, {
    record: user,
    type: 'USERS_UPDATE_START',
  });

  t.truthy(stub.calledWith(config, current, user))
  
});


test(subject + 'calls updateSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateSuccess', stub);

  reducers(current, {
    record: user,
    type: 'USERS_UPDATE_SUCCESS',
  });

  t.truthy(stub.calledWith(config, current, user))
  
});

test(subject + 'calls updateError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('updateError', stub);

  reducers(current, {
    error: error,
    record: user,
    type: 'USERS_UPDATE_ERROR',
  });

  t.truthy(stub.calledWith(config, current, user))
  
});

test(subject + 'calls deleteStart', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteStart', stub);

  reducers(current, {
    record: user,
    type: 'USERS_DELETE_START',
  });

  t.truthy(stub.calledWith(config, current, user))
  
});


test(subject + 'calls deleteSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteSuccess', stub);

  reducers(current, {
    record: user,
    type: 'USERS_DELETE_SUCCESS',
  });

  t.truthy(stub.calledWith(config, current, user))
  
});

test(subject + 'calls deleteError', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('deleteError', stub);

  reducers(current, {
    error: error,
    record: user,
    type: 'USERS_DELETE_ERROR',
  });

  t.truthy(stub.calledWith(config, current, user));
  
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
    store: constants.STORE_SI,
  }

  t.truthy(stub.calledWith(expectedConfig, current, user), 'calls createStart');
  
});

test(subject + 'it passes the given store', function(t) {
  var reducers = reducersFor('users', {store: constants.STORE_MUTABLE});
  var stub = sinon.stub();
  reducersFor.__set__('createStart', stub);

  reducers(current, {
    record: user,
    type:  'USERS_CREATE_START',
  });

  var expectedConfig = {
    key: 'id',
    resourceName: 'users',
    store: 'mutable',
  }

  t.truthy(stub.calledWith(expectedConfig, current, user), 'calls createStart with the correct config');
  
});

test(subject + 'it doesnt mutate the config', function(t) {
  var config = {store: constants.STORE_MUTABLE};
  reducersFor('users', config);
  reducersFor('monkeys', config);

  t.deepEqual(config, {store: constants.STORE_MUTABLE});
  
});
