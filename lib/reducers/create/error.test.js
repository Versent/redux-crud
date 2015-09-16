var reducer         = require('./error');
var test            = require('ava');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourceName:  'users',
}
var subject     = 'createError: ';

function getCurrent() {
  return SI([
    {
      id: 1,
      name: 'Blue'
    },{
      id: 'abc',
      name: 'Green'
    }
  ]);
}

test(subject + 'throws if given an array', function(t) {
  var curr    = getCurrent();
  var created = [];
  function fn() {
    reducer(config, curr, created);
  }

  t.throws(fn, 'expects one');
  t.end();
});

test(subject + 'removes the record', function(t) {
  var curr    = getCurrent();
  var created = {
    id: 'abc',
    name: 'Green'
  };
  var updated = reducer(config, curr, created, 'abc');

  t.same(updated.length, 1);
  t.end();
});
