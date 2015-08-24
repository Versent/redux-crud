var reducer         = require('./error');
var test            = require('tape-catch');
var SI              = require('seamless-immutable');
var config          = {
  key:           'id',
  resourcesName: 'users',
}
var subject     = 'createError: ';

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


test(subject + 'throws if given an array', function(t) {
  var curr    = getCurrent();
  var created = [];
  function fn() {
    reducer(config, curr, created);
  }

  t.throws(fn, 'expects one');
  t.end();
});

test(subject + 'can take one record', function(t) {
  var curr    = getCurrent();
  var created = {
    name: 'Green'
  };
  var updated = reducer(config, curr, created);

  t.equal(updated, curr);
  t.end();
});
