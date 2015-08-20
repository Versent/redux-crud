var test            = require('tape-catch');
var rewire          = require("rewire");
var reducersFor     = rewire('../lib/reducersFor.js');
var sinon           = require('sinon');
var reducers        = reducersFor('users');
var current         = [1];
var users           = [2];

test('calls fetchSuccess', function(t) {
  var stub = sinon.stub();
  reducersFor.__set__('fetchSuccess', stub);

  reducers(current, {
    type: 'USERS_FETCH_SUCCESS',
    users: users
  });

  t.ok(stub.calledWith('users', current, users))
  t.end();
});
