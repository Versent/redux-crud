var reducer         = require('./success');
var test            = require('ava');
var _               = require('lodash');
var constants       = require('../../../constants');

var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_MUTABLE,
  resourceName:  'users',
}
var subject     = 'fetchSuccess (mutable store): ';

function getCurrent() {
  return [
    {
      id: 1,
      name: 'Blue'
    },{
      id: 2,
      name: 'Red'
    }
  ];
}

test(subject + 'returns an array', function(t){
  var curr = getCurrent();
  var more = [{
    id: 3,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.ok(_.isArray(updated));
  t.end();
});

test(subject + 'adds the records', function(t) {
  var curr = getCurrent();
  var more = [{
    id: 3,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.same(updated.length, 3);
  t.end();
});

test(subject + 'it takes an array', function(t) {
  var curr = getCurrent();
  var more = [{
    id: 3,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.same(updated.length, 3);
  t.end();
});

test(subject + 'merges', function(t) {
  var curr = getCurrent();
  var more = [{
    id: 2,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.same(updated.length, 2);
  t.same(updated[1].id, 2);
  t.same(updated[1].name, 'Green');
  t.end();
});

test(subject + 'preserves the order', function(t) {
  var curr = [];
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

  t.same(updated.length, 2, 'it has two');
  t.same(updated[0].id, 11, 'it is in the right position');
  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    store:         constants.STORE_MUTABLE,
    resourceName: 'users',
  }
  var curr = [{
    _id: 2,
    name: 'Blue'
  }];
  var more = [{
    _id: 2,
    name: 'Green'
  }];
  var updated = reducer(config, curr, more);

  t.same(updated.length, 1);
  t.end();
});

test(subject + 'it throws when records dont have an id', function(t) {
  var curr = getCurrent();
  var more = [{
    name: 'Green'
  }];

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

  t.same(updated.length, 3);
  t.end();
});
