var reducer         = require('./success');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
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

test(subject + 'throws if curr not immutable', function(t) {
  var curr = [];
  var records = [];
  var f = function() {
    reducer(config, curr, records);
  }
  t.throws(f);
  t.end();
});

test(subject + 'returns an immutable collection', function(t){
  var curr = getCurrent();
  var records = [{
    id: 2,
  }];
  var updated = reducer(config, curr, records);

  t.ok(SI.isImmutable(updated));
  t.end();
});

test(subject + 'it takes immutables', function(t) {
  var curr = getCurrent();
  var records = SI([{
    id: 2,
  }]);
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 1);
  t.end();
});

test(subject + 'removes the record', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 1,
  }];
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 1, 'removes the record');
  t.equal(updated[0].id, 2);

  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:           '_id',
    resourcesName: 'users',
  }
  var curr = SI([{
    _id: 1,
  }]);
  var records = [{
    _id: 1,
  }];
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 0, 'removes the record');
  t.end();
});

test(subject + 'it throws when records dont have an id', function(t) {
  var curr = getCurrent();
  var records = [{
    name: 'Green'
  }];

  var f = function() {
    reducer(config, curr, records);
  }
  t.throws(f);
  t.end();
});

test(subject + 'can take one record', function(t){
  var curr    = getCurrent();
  var records = {
    id:   1,
  };
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 1, 'removes the record');
  t.end();
});


