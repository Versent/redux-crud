var reducer         = require('./success');
var test            = require('ava');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourceName:  'users',
}
var subject     = 'createSuccess: ';

function getCurrent() {
  return SI([
    {
      id: 1,
      name: 'Blue'
    },{
      id: 2,
      name: 'Red'
    }
  ]);
}

test(subject + 'throws if curr not immutable', function(t) {
  var curr   = [];
  var record = {id: 1};
  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f, /users.createSuccess: Expected current to be immutable/);
  t.end();
});

test(subject + 'it throws if it cannot find config.key', function(t) {
  var curr = getCurrent();
  var record = {};
  var config = {
    resourceName: 'users'
  }
  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f, /users.createSuccess: Expected config.key/);
  t.end();
});

test(subject + 'returns an immutable collection', function(t){
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.ok(SI.isImmutable(updated));
  t.end();
});

test(subject + 'throws if given an array', function(t) {
  var curr    = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, /users.createSuccess: Expected record not to be an array/);
  t.end();
});

test(subject + 'adds the record', function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 3);
  t.end();
});

test(subject + 'it takes immutables', function(t) {
  var curr = getCurrent();
  var record = SI({
    id: 3,
    name: 'Green'
  });
  var updated = reducer(config, curr, record);

  t.same(updated.length, 3);
  t.end();
});

test(subject + 'merges if exists', function(t) {
  var curr = getCurrent();
  var record = {
    id: 2,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 2);
  t.same(updated[1].id, 2);
  t.same(updated[1].name, 'Green');
  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    resourceName: 'users',
  }
  var curr = SI([{
    _id: 2,
    name: 'Blue'
  }]);
  var record = {
    _id: 2,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 1);
  t.end();
});

test(subject + 'it throws when record doesnt have an id', function(t) {
  var curr = getCurrent();
  var record = {
    name: 'Green'
  };

  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f, /users.createSuccess: Expected to record to have id/);
  t.end();
});

test(subject + 'it uses the cid', function(t) {
  var cid = 'abc';
  var curr = SI([
    {
      id: cid,
      name: 'Blue'
    }
  ]);
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record, cid);
  t.same(updated.length, 1);
  t.end();
});

test(subject + 'removes busy and pendingCreate', function(t) {
  var curr = SI([{
    busy: true,
    id:   2,
    name: 'Green',
    pendingCreate: true,
  }]);
  var record  = {
    id: 2,
    name: 'Yellow'
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 1);
  t.ok(updated[0].busy == null, 'removes busy');
  t.ok(updated[0].pendingCreate == null, 'removes pendingCreate');
  t.end();
});

