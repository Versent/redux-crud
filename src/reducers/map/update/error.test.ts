import * as r from "ramda";
import test from "ava";

import constants from "../../../constants";
import reducer from "./error";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = constants.REDUCER_NAMES.UPDATE_ERROR;

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue",
      busy: true,
      pendingUpdate: true
    },
    2: {
      id: 2,
      name: "Red",
      busy: true,
      pendingUpdate: true
    }
  };
}

function getValid() {
  return {
    id: 2,
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

test(subject + "doesnt add record if not there", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 2);
});

test(subject + "removes busy", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.truthy(updated["1"].busy, "doesnt remove on others");
  t.truthy(updated["2"].busy == null, "removes busy");
});

test(subject + "doesnt mutate the original collection", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.is(curr["2"].busy, true);
  t.is(updated["2"].busy, undefined);
});

test(subject + "doesnt remove pendingUpdate", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.truthy(updated["2"].pendingUpdate);
});

test(subject + "uses the given key", function(t) {
  var config = {
    key: "_id",
    resourceName: "users"
  };
  var curr = {
    2: {
      _id: 2,
      name: "Blue",
      busy: true,
      unsaved: true
    }
  };
  var record = {
    _id: 2
  };
  var updated = reducer(config, curr, record);

  t.truthy(updated["2"].busy == null, "removes busy");
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
