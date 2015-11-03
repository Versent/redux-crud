var reducer         = require('./start');
var test            = require('ava');
var _               = require('lodash');
var constants       = require('../../../constants');

var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_MUTABLE,
  resourceName:  'users',
}
var subject     = 'deleteStart (mutable store): ';

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

test(subject + 'marks record as deleted and busy', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.ok(updated[0].deleted, 'adds deleted');
  t.ok(updated[0].busy, 'adds busy');

  t.ok(updated[1].deleted == null, 'doesnt add deleted to others');
  t.ok(updated[1].busy == null, 'doesnt add busy to others');

  t.end();
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

  t.ok(updated[0].deleted, 'adds deleted');
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
