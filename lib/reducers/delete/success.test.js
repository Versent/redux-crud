var reducer         = require('./success');
var test            = require('ava');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourceName:  'users',
}
var subject     = 'deleteSuccess: ';

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

function getValid() {
  return {
    id:   1,
    name: 'Green'
  };
}

test(subject + 'throws if curr not immutable', function(t) {
  var curr    = [];
  var records = getValid();
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

test(subject + 'it takes immutables', function(t) {
  var curr    = getCurrent();
  var record  = SI(getValid());
  var updated = reducer(config, curr, record);

  t.same(updated.length, 1);
  t.end();
});

test(subject + 'removes the record', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.same(updated.length, 1, 'removes the record');
  t.same(updated[0].id, 2);

  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    resourceName: 'users',
  }
  var curr = SI([{
    _id: 1,
  }]);
  var record = {
    _id: 1,
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 0, 'removes the record');
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



