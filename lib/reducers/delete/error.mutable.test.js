var reducer         = require('./error');
var test            = require('ava');
var isArray         = require('lodash.isarray');
var constants       = require('../../../constants');

var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_MUTABLE,
  resourceName:  'users',
};
var subject     = 'deleteError (mutable store): ';

function getCurrent() {
  return [
    {
      id: 1,
      name: 'Blue',
      deleted: true,
      busy: true,
    },{
      id: 2,
      name: 'Red',
      deleted: true,
      busy: true,
    }
  ];
}

test(subject + 'returns an array', function(t){
  var curr = getCurrent();
  var record = {
    id: 2,
  };
  var updated = reducer(config, curr, record);

  t.truthy(isArray(updated));
  
});

test(subject + 'throws if given an array', function(t) {
  var curr    = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, 'expects one');
  
});

test(subject + 'removes deleted and busy', function(t) {
  var curr = getCurrent();
  var record = {
    id: 1,
  };
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 2, 'doesnt remove record');
  t.truthy(updated[0].deleted == null, 'removes deleted');
  t.truthy(updated[0].busy == null, 'removes busy');

  t.truthy(updated[1].deleted, 'doesnt removes deleted from others');
  t.truthy(updated[1].busy, 'doesnt removes busy from others');

  
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    store:        constants.STORE_MUTABLE,
    resourceName: 'users',
  }
  var curr = [{
    _id: 1,
    deleted: true,
    busy: true,
  }];
  var record = {
    _id: 1,
  };
  var updated = reducer(config, curr, record);

  t.truthy(updated[0].deleted == null, 'removes deleted');
  t.truthy(updated[0].busy == null, 'removes busy');

  
});

test(subject + 'it throws when record doesnt have an id', function(t) {
  var curr = getCurrent();
  var record = {
    name: 'Green'
  };

  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f);

  
});
