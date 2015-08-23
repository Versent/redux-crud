var reducer         = require('./error');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
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
    id: 1,
  }]);
  var updated = reducer(config, curr, records);

  t.ok(updated[0].deleted == null, 'removes deleted');
  t.ok(updated[0].busy == null, 'removes busy');

  t.end();
});

test(subject + 'removes deleted and busy', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 1,
  }];
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 2, 'doesnt remove records');
  t.ok(updated[0].deleted == null, 'removes deleted');
  t.ok(updated[0].busy == null, 'removes busy');

  t.ok(updated[1].deleted, 'doesnt removes deleted from others');
  t.ok(updated[1].busy, 'doesnt removes busy from others');

  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:           '_id',
    resourcesName: 'users',
  }
  var curr = SI([{
    _id: 1,
    deleted: true,
    busy: true,
  }]);
  var records = [{
    _id: 1,
  }];
  var updated = reducer(config, curr, records);

  t.ok(updated[0].deleted == null, 'removes deleted');
  t.ok(updated[0].busy == null, 'removes busy');

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

  t.ok(updated[0].deleted == null, 'removes deleted');
  t.ok(updated[0].busy == null, 'removes busy');

  t.end();
});


