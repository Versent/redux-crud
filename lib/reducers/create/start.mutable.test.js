var reducer         = require('./start');
var test            = require('ava');
var constants       = require('../../../constants');

var config          = {
  key:           constants.DEFAULT_KEY,
  store:         constants.STORE_MUTABLE,
  resourceName:  'users',
};
var subject         = 'createStart (mutable store): ';

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
    id: 3,
    name: 'Green'
  }
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

test(subject + 'adds the new record', function(t) {
  var curr    = getCurrent();
  var other = {
    id: 3,
    name: 'Green'
  };
  var updated = reducer(config, curr, other);

  t.same(updated.length, 3, 'adds the record');
  t.end();
});

test(subject + 'it throws when record doesnt have an id', function(t) {
  var curr   = getCurrent();
  var record = {
    name: 'Green'
  };

  var f = function() {
    reducer(config, curr, record);
  }
  t.throws(f, /users.createStart: Expected to record to have id/);
  t.end();
});

test(subject + 'adds busy and pendingCreate', function(t) {
  var curr    = getCurrent();
  var record  = getValid();
  var updated = reducer(config, curr, record);

  t.same(updated[2].name, 'Green');
  t.ok(updated[2].busy, 'adds busy');
  t.ok(updated[2].pendingCreate, 'adds pendingCreate');
  t.end();
});
