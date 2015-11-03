var test              = require('ava');
var actionCreatorsFor = require('./actionCreatorsFor');

var error             = {};
var actionCreators    = actionCreatorsFor('users');
var subject           =' actionCreatorsFor: ';
var arrayRegEx        = /Expected record not to be an array/;

function makeUser() {
  return {
    id: 11
  };
}

function makeUsers() {
  return [makeUser()];
}

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
  var data = {foo: 1}
  
  var action = actionCreators.fetchStart(data);
  
  t.same(action.type, 'USERS_FETCH_START');
  t.same(action.data, data, 'has the data');

  t.end();
});

test(subject + 'fetchSuccess', function(t) {
  var data  = {foo: 1}
  var users = makeUsers();
  
  var action = actionCreators.fetchSuccess(users, data);

  t.same(action.type, 'USERS_FETCH_SUCCESS');
  t.same(action.records, users, 'has the user');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.fetchSuccess();
  }
  t.throws(withoutPayload, /Expected records/);

  t.end();
});

test(subject + 'fetchError', function(t) {
  var data = {foo: 1};
  
  var action = actionCreators.fetchError(error, data);

  t.same(action.type, 'USERS_FETCH_ERROR');
  t.same(action.error, error, 'has the error');
  t.same(action.data, data, 'has the data');

  t.end();
});

test(subject + 'createStart', function(t) {
  var user = makeUser();
  var data = {foo: 1};

  var action = actionCreators.createStart(user, data);

  t.same(action.type, 'USERS_CREATE_START');
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

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

  t.end();
});

test(subject + 'createSuccess', function(t) {
  var user = makeUser();
  var data = {foo: 1};

  var action = actionCreators.createSuccess(user, 'abc', data);
  
  t.same(action.type, 'USERS_CREATE_SUCCESS');
  t.same(action.record, user, 'has the user');
  t.same(action.cid, 'abc', 'has the cid');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.createSuccess();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.createSuccess([]);
  }
  t.throws(withArray, arrayRegEx);

  t.end();
});

test(subject + 'createError', function(t) {
  var user = makeUser();
  var data = {foo: 1};

  var action = actionCreators.createError(error, user, data);

  t.same(action.type, 'USERS_CREATE_ERROR');
  t.same(action.error, error);
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

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

  t.end();
});

test(subject + 'updateStart', function(t) {
  var user   = makeUser();
  var data = {foo: 1};

  var action = actionCreators.updateStart(user, data);
  
  t.same(action.type, 'USERS_UPDATE_START');
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.updateStart();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.updateStart([]);
  }
  t.throws(withArray, arrayRegEx);

  t.end();
});

test(subject + 'updateSuccess', function(t) {
  var user   = makeUser();
  var data = {foo: 1};

  var action = actionCreators.updateSuccess(user, data);
  
  t.same(action.type, 'USERS_UPDATE_SUCCESS');
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.updateSuccess();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.updateSuccess([]);
  }
  t.throws(withArray, arrayRegEx);

  t.end();
});

test(subject + 'updateError', function(t) {
  var user   = makeUser();
  var data = {foo: 1};
  
  var action = actionCreators.updateError(error, user, data);
  
  t.same(action.type, 'USERS_UPDATE_ERROR');
  t.same(action.error, error);
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.updateError(error);
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.updateError(error, []);
  }
  t.throws(withArray, arrayRegEx);

  t.end();
});

test(subject + 'deleteStart', function(t) {
  var user   = makeUser();
  var data = {foo: 1};

  var action = actionCreators.deleteStart(user, data);
  
  t.same(action.type, 'USERS_DELETE_START');
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.deleteStart();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.deleteStart([]);
  }
  t.throws(withArray, arrayRegEx);

  t.end();
});

test(subject + 'deleteSuccess', function(t) {
  var user   = makeUser();
  var data = {foo: 1};

  var action = actionCreators.deleteSuccess(user, data);
  
  t.same(action.type, 'USERS_DELETE_SUCCESS');
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.deleteSuccess();
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.deleteSuccess([]);
  }
  t.throws(withArray, arrayRegEx);

  t.end();
});

test(subject + 'deleteError', function(t) {
  var user    = makeUser();
  var data = {foo: 1};
  
  var action = actionCreators.deleteError(error, user, data);
  
  t.same(action.type, 'USERS_DELETE_ERROR');
  t.same(action.error, error);
  t.same(action.record, user, 'has the user');
  t.same(action.data, data, 'has the data');

  function withoutPayload() {
    actionCreators.deleteError(error);
  }
  t.throws(withoutPayload, /Expected record/);

  // it expects one
  function withArray() {
    actionCreators.deleteError(error, []);
  }
  t.throws(withArray, arrayRegEx);

  t.end();
});
