var reducer         = require('./error');
var test            = require('ava');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourceName:  'users',
}
var subject     = 'updateError: ';

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
  var curr    = [];
  var record = getValid();
  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f);
  t.end();
});

test(subject + 'returns an immutable collection', function(t){
  var curr    = getCurrent();
  var record = getValid();
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

test(subject + 'doesnt add record if not there', function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 2);
  t.end();
});

test(subject + 'it takes immutables', function(t) {
  var curr    = getCurrent();
  var record  = SI(getValid());
  var updated = reducer(config, curr, record);

  t.same(updated.length, 2);
  t.end();
});

test(subject + 'removes busy', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.ok(updated[0].busy, 'doesnt remove on others');
  t.ok(updated[1].busy == null, 'removes busy');
  t.end();
});

test(subject + 'doesnt remove unsaved', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.ok(updated[1].unsaved);
  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    resourceName: 'users',
  }
  var curr = SI([{
    _id: 2,
    name: 'Blue',
    busy: true,
    unsaved: true,
  }]);
  var record = {
    _id: 2,
  };
  var updated = reducer(config, curr, record);

  t.ok(updated[0].busy == null, 'removes busy');
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

