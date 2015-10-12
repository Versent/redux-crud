var reducer         = require('./success');
var test            = require('ava');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourceName:  'users',
}
var subject     = 'updateSuccess: ';

function getCurrent() {
  return SI([
    {
      id: 1,
      name: 'Blue',
      unsaved: true,
      busy: true,
    },{
      id: 2,
      name: 'Red',
      unsaved: true,
      busy: true,
    }
  ]);
}

function getValid() {
  return {
    id:   2,
    name: 'Green'
  };
}

test(subject + 'throws if curr not immutable', function(t) {
  var curr   = [];
  var record = getValid();
  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f);
  t.end();
});

test(subject + 'returns an immutable collection', function(t){
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.ok(SI.isImmutable(updated));
  t.end();
});

test(subject + 'throws if given an array', function(t) {
  var curr   = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, 'expects one');
  t.end();
});

test(subject + 'adds the record if not there', function(t) {
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
  var curr    = getCurrent();
  var record  = SI(getValid());
  var updated = reducer(config, curr, record);

  t.same(updated.length, 2);
  t.end();
});

test(subject + 'updates existing', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.same(updated.length, 2);
  t.same(updated[1].id, 2);
  t.same(updated[1].name, 'Green');
  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:           '_id',
    resourceName:  'users',
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

test(subject + 'it throws when record dont have an id', function(t) {
  var curr = getCurrent();
  var record = {
    name: 'Green'
  };

  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f);
  t.end();
});

test(subject + 'removes busy and pendingUpdate', function(t) {
  var curr = SI([{
    id:   2,
    name: 'Green',
    pendingUpdate: true,
    busy: true,
  }]);
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.same(updated.length, 1);
  t.ok(updated[0].busy == null, 'removes busy');
  t.ok(updated[0].pendingUpdate == null, 'removes pendingUpdate');
  t.end();
});

