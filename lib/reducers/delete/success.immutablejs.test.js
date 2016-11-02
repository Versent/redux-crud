var reducer         = require('./success');
var test            = require('ava');
var fromJS          = require('immutable').fromJS;
var constants         = require('../../../constants');
var isImmutable     = require('../../utils/isImmutableJs');
var config          = {
  key:           constants.DEFAULT_KEY,
  resourceName:  'users',
  store:         constants.STORE_IMMUTABLE,
}
var subject     = 'deleteSuccess: (immutable.js store) ';

function getCurrent() {
  return fromJS([
    {
      id: 1,
      name: 'Blue'
    },{
      id: 2,
      name: 'Red'
    }
  ]);
}

function getValid() {
  return {
    id:   1,
    name: 'Green'
  };
}

test(subject + 'throws if curr not immutable', function(t) {
  var curr    = [];
  var records = getValid();
  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f);
  
});

test(subject + 'returns an immutable collection', function(t){
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.truthy(isImmutable(updated));
  
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
  var record  = fromJS(getValid());
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 1);
  
});

test(subject + 'removes the record', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 1, 'removes the record');
  t.deepEqual(updated[0].id, 2);

  
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    resourceName: 'users',
    store:        constants.STORE_IMMUTABLE,
  }
  var curr = fromJS([{
    _id: 1,
  }]);
  var record = {
    _id: 1,
  };
  var updated = reducer(config, curr, record).toJS();

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
