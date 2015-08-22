var reducer         = require('./success');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
}

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

test('fetch.success', function(t) {

  t.test('throws if curr not immutable', function(tt) {
    var curr = [];
    var more = [];
    var f = function() {
      reducer(config, curr, more);
    }
    tt.throws(f);
    tt.end();
  });

  t.test('returns an immutable collection', function(tt){
    var curr = getCurrent();
    var more = [{
      id: 3,
      name: 'Green'
    }];
    var updated = reducer(config, curr, more);

    tt.ok(SI.isImmutable(updated));
    tt.end();
  });

  t.test('adds the records', function(tt) {
    var curr = getCurrent();
    var more = [{
      id: 3,
      name: 'Green'
    }];
    var updated = reducer(config, curr, more);

    tt.equal(updated.length, 3);
    tt.end();
  });

  t.test('it takes immutables', function(tt) {
    var curr = getCurrent();
    var more = SI([{
      id: 3,
      name: 'Green'
    }]);
    var updated = reducer(config, curr, more);

    tt.equal(updated.length, 3);
    tt.end();
  });

  t.test('merges', function(tt) {
    var curr = getCurrent();
    var more = [{
      id: 2,
      name: 'Green'
    }];
    var updated = reducer(config, curr, more);

    tt.equal(updated.length, 2);
    tt.equal(updated[1].id, 2);
    tt.equal(updated[1].name, 'Green');
    tt.end();
  });

  t.test('uses the given key', function(tt) {
    var config = {
      key:           '_id',
      resourcesName: 'users',
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

    tt.equal(updated.length, 1);
    tt.end();
  });

  t.test('it throws when records dont have an id', function(tt) {
    var curr = getCurrent();
    var more = SI([{
      name: 'Green'
    }]);

    var f = function() {
      reducer(config, curr, more);
    }
    tt.throws(f);
    tt.end();
  });

  t.test('it takes one record', function(tt) {
    var curr = getCurrent();
    var one = {
      id: 3,
      name: 'Green'
    };
    var updated = reducer(config, curr, one);

    tt.equal(updated.length, 3);
    tt.end();
  })
  
  t.end();
});
