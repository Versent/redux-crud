import constants       from '../../constants';
import reducer         from './error';
import test            from 'ava';

var assign          = require('lodash.assign');
var values          = require('lodash.values');
var subject         = 'createError: ';
var config          = {
  key:           constants.DEFAULT_KEY,
  resourceName:  'users',
}
var configAsMap     = assign({}, config, {
  store: constants.STORE_MAP,
});

function getCurrent() {
  return [
    {
      id: 1,
      name: 'Blue'
    },{
      id: 'abc',
      name: 'Green'
    }
  ];
}

function getCurrentAsMap() {
  return {
    1: {
      id: 1,
      name: 'Blue'
    },
    2: {
      id: 'abc',
      name: 'Green'
    }
  };
}

test(subject + 'throws if given an array', function(t) {
  var curr    = getCurrent();
  var created = [];

  function fn() {
    reducer(config, curr, created);
  }

  t.throws(fn, TypeError);
});

test(subject + 'removes the record', function(t) {
  var curr    = getCurrent();
  var created = {
    id: 'abc',
    name: 'Green'
  };
  var updated = reducer(config, curr, created);

  t.deepEqual(updated.length, 1);
});

test(subject + 'removes the record with map store', function(t) {
  var curr    = getCurrentAsMap();
  t.deepEqual(values(curr).length, 2);

  var created = {
    id: 'abc',
    name: 'Green'
  };
  var updated = reducer(configAsMap, curr, created);

  t.deepEqual(values(updated).length, 2);
});
