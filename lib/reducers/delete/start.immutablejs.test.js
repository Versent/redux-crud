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
var subject     = 'deleteStart: (immutable.js store) ';

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
  var record  = getValid();
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

  t.deepEqual(updated.length, 2);
  
});

test(subject + 'marks record as deleted and busy', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record).toJS();

  t.truthy(updated[0].deleted, 'adds deleted');
  t.truthy(updated[0].busy, 'adds busy');

  t.truthy(updated[1].deleted == null, 'doesnt add deleted to others');
  t.truthy(updated[1].busy == null, 'doesnt add busy to others');

  
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

  t.truthy(updated[0].deleted, 'adds deleted');
  
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
