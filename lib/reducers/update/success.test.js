var reducer         = require('./success');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
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
    name: 'Green'
  }];
  var updated = reducer(config, curr, records);

  t.ok(SI.isImmutable(updated));
  t.end();
});

test(subject + 'adds the records if not there', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 3,
    name: 'Green'
  }];
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 3);
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

test(subject + 'updates existing', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 2,
    name: 'Green'
  }];
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 2);
  t.equal(updated[1].id, 2);
  t.equal(updated[1].name, 'Green');
  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:           '_id',
    resourcesName: 'users',
  }
  var curr = SI([{
    _id: 2,
    name: 'Blue'
  }]);
  var records = [{
    _id: 2,
    name: 'Green'
  }];
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 1);
  t.end();
});

test(subject + 'it throws when records dont have an id', function(t) {
  var curr = getCurrent();
  var records = SI([{
    name: 'Green'
  }]);

  var f = function() {
    reducer(config, curr, records);
  }
  t.throws(f);
  t.end();
});

test(subject + 'can take one record', function(t){
  var curr    = getCurrent();
  var records = {
    id:   2,
    name: 'Green'
  };
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 2);
  t.end();
});

test(subject + 'removes unsaved and busy', function(t) {
  var curr = SI([{
    id:   2,
    name: 'Green',
    unsaved: true,
    busy: true,
  }]);
  var records = {
    id:   2,
    name: 'Green'
  };
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 1);
  t.ok(updated[0].unsaved == null, 'removes unsaved');
  t.ok(updated[0].busy == null, 'removes busy');
  t.end();
});

