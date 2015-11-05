var reducer         = require('./error');
var test            = require('ava');
var _               = require('lodash');
var constants       = require('../../../constants');

var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_MUTABLE,
  resourceName:  'users',
}
var subject     = 'updateError (mutable store): ';

function getCurrent() {
  return [
    {
      id: 1,
      name: 'Blue',
      busy: true,
      pendingUpdate: true,
    },{
      id: 2,
      name: 'Red',
      busy: true,
      pendingUpdate: true,
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
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.ok(_.isArray(updated));
  t.end();
});

test(subject + 'throws if given an array', function(t) {
  var curr   = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, 'expects one');
  t.end();
});

test(subject + 'doesnt add record if not there', function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, record);

  t.same(updated.length, 2);
  t.end();
});

test(subject + 'removes busy', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.ok(updated[0].busy, 'doesnt remove on others');
  t.ok(updated[1].busy == null, 'removes busy');
  t.end();
});

test(subject + 'doesnt remove pendingUpdate', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.ok(updated[1].pendingUpdate);
  t.end();
});

test(subject + 'uses the given key', function(t) {
  var config = {
    key:          '_id',
    store:        constants.STORE_MUTABLE,
    resourceName: 'users',
  }
  var curr = [{
    _id: 2,
    name: 'Blue',
    busy: true,
    unsaved: true,
  }];
  var record = {
    _id: 2,
  };
  var updated = reducer(config, curr, record);

  t.ok(updated[0].busy == null, 'removes busy');
  t.end();
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
  t.end();
});
