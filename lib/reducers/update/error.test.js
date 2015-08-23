var reducer         = require('./error');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
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

test(subject + 'doesnt add records if not there', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 3,
    name: 'Green'
  }];
  var updated = reducer(config, curr, records);

  t.equal(updated.length, 2);
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

test(subject + 'removes busy', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 2,
  }];
  var updated = reducer(config, curr, records);

  t.ok(updated[0].busy, 'doesnt remove on others');
  t.ok(updated[1].busy == null, 'removes busy');
  t.end();
});

test(subject + 'doesnt remove unsaved', function(t) {
  var curr = getCurrent();
  var records = [{
    id: 2,
  }];
  var updated = reducer(config, curr, records);

  t.ok(updated[1].unsaved);
  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:           '_id',
    resourcesName: 'users',
  }
  var curr = SI([{
    _id: 2,
    name: 'Blue',
    busy: true,
    unsaved: true,
  }]);
  var records = [{
    _id: 2,
  }];
  var updated = reducer(config, curr, records);

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
  t.ok(curr[1].busy);

  var records = {
    id:   2,
  };
  var updated = reducer(config, curr, records);

  t.ok(updated[1].busy == null, 'removes busy');
  t.end();
});

