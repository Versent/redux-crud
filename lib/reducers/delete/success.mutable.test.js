var reducer         = require('./success');
var test            = require('ava');
var isArray         = require('lodash.isarray')
var constants       = require('../../../constants');

var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_MUTABLE,
  resourceName:  'users',
}
var subject     = 'deleteSuccess (mutable store): ';

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

function getValid() {
  return {
    id:   1,
    name: 'Green'
  };
}

test(subject + 'returns an array', function(t){
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.truthy(isArray(updated));
  
});

test(subject + 'throws if given an array', function(t) {
  var curr   = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, 'expects one');
  
});

test(subject + 'it takes immutables', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 1);
  
});

test(subject + 'removes the record', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 1, 'removes the record');
  t.deepEqual(updated[0].id, 2);

  
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    store:        constants.STORE_MUTABLE,
    resourceName: 'users',
  }
  var curr = [{
    _id: 1,
  }];
  var record = {
    _id: 1,
  };
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 0, 'removes the record');
  
});

test(subject + 'it throws when record dont have an id', function(t) {
  var curr = getCurrent();
  var record = {
    name: 'Green'
  };

  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f);
  
});
