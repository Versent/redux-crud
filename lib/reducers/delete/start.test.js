var reducer         = require('./start');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
}
var subject     = 'deleteStart: ';

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
    name: 'Green'
  }]);
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 2);
  t.end();
});

test(subject + 'marks records as deleted and busy', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 1,
  }];
  var updated = reducer(config, curr, records);

  t.ok(updated[0].deleted, 'adds deleted');
  t.ok(updated[0].busy, 'adds busy');

  t.ok(updated[1].deleted == null, 'doesnt add deleted to others');
  t.ok(updated[1].busy == null, 'doesnt add busy to others');

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

  t.ok(updated[0].deleted, 'adds deleted');
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

  t.ok(updated[0].deleted, 'adds deleted');
  t.end();
});


