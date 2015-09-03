var reducer         = require('./success');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourceName:  'users',
}
var subject     = 'fetchSuccess: ';

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
  var curr = [];
  var more = [];
  var f = function() {
    reducer(config, curr, more);
  }
  t.throws(f);
  t.end();
});

test(subject + 'returns an immutable collection', function(t){
  var curr = getCurrent();
  var more = [{
    id: 3,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.ok(SI.isImmutable(updated));
  t.end();
});

test(subject + 'adds the records', function(t) {
  var curr = getCurrent();
  var more = [{
    id: 3,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.equal(updated.length, 3);
  t.end();
});

test(subject + 'it takes immutables', function(t) {
  var curr = getCurrent();
  var more = SI([{
    id: 3,
    name: 'Green'
  }]);
  var updated = reducer(config, curr, more);

  t.equal(updated.length, 3);
  t.end();
});

test(subject + 'merges', function(t) {
  var curr = getCurrent();
  var more = [{
    id: 2,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.equal(updated.length, 2);
  t.equal(updated[1].id, 2);
  t.equal(updated[1].name, 'Green');
  t.end();
});

test(subject + 'preserves the order', function(t) {
  var curr = SI([]);
  var more = [
    {
      id: 11,
      label: 'Eleven'
    },
    {
      id: 7,
      label: 'Sevent'
    }
  ]
  var updated = reducer(config, curr, more);

  t.equal(updated.length, 2, 'it has two');
  t.equal(updated[0].id, 11, 'it is in the right position');
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
  var more = [{
    _id: 2,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.equal(updated.length, 1);
  t.end();
});

test(subject + 'it throws when records dont have an id', function(t) {
  var curr = getCurrent();
  var more = SI([{
    name: 'Green'
  }]);

  var f = function() {
    reducer(config, curr, more);
  }
  t.throws(f);
  t.end();
});

test(subject + 'can take one record', function(t) {
  var curr = getCurrent();
  var one = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, one);

  t.equal(updated.length, 3);
  t.end();
});

