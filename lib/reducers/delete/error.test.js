var reducer         = require('./error');
var test            = require('ava');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourceName:  'users',
}
var subject     = 'deleteError: ';

function getCurrent() {
  return SI([
    {
      id: 1,
      name: 'Blue',
      deleted: true,
      busy: true,
    },{
      id: 2,
      name: 'Red',
      deleted: true,
      busy: true,
    }
  ]);
}

test(subject + 'throws if curr not immutable', function(t) {
  var curr   = [];
  var record = {id: 1};
  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f);
  t.end();
});

test(subject + 'returns an immutable collection', function(t){
  var curr = getCurrent();
  var record = {
    id: 2,
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

  t.throws(fn, 'expects one');
  t.end();
});

test(subject + 'it takes immutables', function(t) {
  var curr = getCurrent();
  var record = SI({
    id: 1,
  });
  var updated = reducer(config, curr, record);

  t.ok(updated[0].deleted == null, 'removes deleted');
  t.ok(updated[0].busy == null, 'removes busy');

  t.end();
});

test(subject + 'removes deleted and busy', function(t) {
  var curr = getCurrent();
  var record = {
    id: 1,
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 2, 'doesnt remove record');
  t.ok(updated[0].deleted == null, 'removes deleted');
  t.ok(updated[0].busy == null, 'removes busy');

  t.ok(updated[1].deleted, 'doesnt removes deleted from others');
  t.ok(updated[1].busy, 'doesnt removes busy from others');

  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    resourceName: 'users',
  }
  var curr = SI([{
    _id: 1,
    deleted: true,
    busy: true,
  }]);
  var record = {
    _id: 1,
  };
  var updated = reducer(config, curr, record);

  t.ok(updated[0].deleted == null, 'removes deleted');
  t.ok(updated[0].busy == null, 'removes busy');

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
  t.throws(f);

  t.end();
});



