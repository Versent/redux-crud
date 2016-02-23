var reducer         = require('./error');
var test            = require('ava');
var fromJS          = require('immutable').fromJS;
var constants       = require('../../../constants');
var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_IMMUTABLE,
  resourceName:  'users',
}
var subject     = 'createError: (immutable.js store) ';

function getCurrent() {
  return fromJS([
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
  var updated = reducer(config, curr, created, 'abc').toJS();

  t.same(updated.length, 1);
  t.end();
});
