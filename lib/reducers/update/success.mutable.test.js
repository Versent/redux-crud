var reducer         = require('./success');
var test            = require('ava');
var isArray         = require('lodash.isarray');
var constants       = require('../../../constants')

var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_MUTABLE,
  resourceName:  'users',
}
var subject     = 'updateSuccess (mutable store): ';

function getCurrent() {
  return [
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
  ];
}

function getValid() {
  return {
    id:   2,
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

test(subject + 'adds the record if not there', function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 3);
  
});

test(subject + 'updates existing', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 2);
  t.deepEqual(updated[1].id, 2);
  t.deepEqual(updated[1].name, 'Green');
  
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:           '_id',
    store:         constants.STORE_MUTABLE,
    resourceName:  'users',
  }
  var curr = [{
    _id: 2,
    name: 'Blue'
  }];
  var record = {
    _id: 2,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

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

test(subject + 'removes busy and pendingUpdate', function(t) {
  var curr = [{
    id:   2,
    name: 'Green',
    pendingUpdate: true,
    busy: true,
  }];
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 1);
  t.truthy(updated[0].busy == null, 'removes busy');
  t.truthy(updated[0].pendingUpdate == null, 'removes pendingUpdate');
  
});
