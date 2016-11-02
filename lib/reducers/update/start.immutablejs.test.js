var reducer         = require('./start');
var test            = require('ava');
var fromJS          = require('immutable').fromJS;
var constants         = require('../../../constants');
var isImmutable     = require('../../utils/isImmutableJs');
var config          = {
  key:           constants.DEFAULT_KEY,
  resourceName:  'users',
  store:         constants.STORE_IMMUTABLE,
}
var subject     = 'updateStart: (immutable.js store) ';

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
    id:   2,
    name: 'Green'
  };
}

test(subject + 'throws if curr not immutable', function(t) {
  var curr   = [];
  var record = getValid();
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

test(subject + 'adds the record if not there', function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 3);
  
});

test(subject + 'it takes immutables', function(t) {
  var curr    = getCurrent();
  var record  = fromJS(getValid());
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 2);
  
});

test(subject + 'updates existing', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 2);
  t.deepEqual(updated[1].id, 2);
  t.deepEqual(updated[1].name, 'Green');
  
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    resourceName: 'users',
    store:        constants.STORE_IMMUTABLE,
  }
  var curr = fromJS([{
    _id: 2,
    name: 'Blue'
  }]);
  var record = {
    _id: 2,
    name: 'Green'
  };
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated.length, 1);
  
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

test(subject + 'adds busy and pendingUpdate', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record).toJS();

  t.deepEqual(updated[1].name, 'Green');
  t.truthy(updated[1].busy, 'adds busy');
  t.truthy(updated[1].pendingUpdate, 'adds pendingUpdate');
  
});
