import * as r from "ramda";
import test from "ava";

import constants from "../../../constants";
import reducer from "./success";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = constants.REDUCER_NAMES.DELETE_SUCCESS;

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue"
    },
    2: {
      id: 2,
      name: "Red"
    }
  };
}

function getValid() {
  return {
    id: 1,
    name: "Green"
  };
}

test(subject + "throws if given an array", function(t) {
  var curr = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, TypeError);
});

test(subject + "removes the record", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 1, "removes the record");
  t.is(updated["1"], undefined);
});

test(subject + "doesnt mutate the original collection", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.is(r.values(curr).length, 2);
  t.is(r.values(updated).length, 1);
});

test(subject + "uses the given key", function(t) {
  var config = {
    key: "_id",
    resourceName: "users"
  };
  var curr = [
    {
      _id: 1
    }
  ];
  var record = {
    _id: 1
  };
  var updated = reducer(config, curr, record);

  t.deepEqual(r.values(updated).length, 0, "removes the record");
});

test(subject + "it throws when record dont have an id", function(t) {
  var curr = getCurrent();
  var record = {
    name: "Green"
  };

  var f = function() {
    reducer(config, curr, record);
  };
  t.throws(f);
});
