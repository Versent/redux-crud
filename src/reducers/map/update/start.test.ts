import * as r from "ramda";
import test from "ava";

import constants from "../../../constants";
import reducer from "./start";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = constants.REDUCER_NAMES.UPDATE_START;

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

test(subject + "adds the record if not there", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 3);
});

test(subject + "doesnt mutate the original", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(curr).length, 2);
  t.is(r.values(updated).length, 3);
});

test(subject + "updates existing", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 2);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
});

test(subject + "uses the given key", function(t) {
  var config = {
    key: "_id",
    resourceName: "users"
  };
  var curr = {
    2: {
      _id: 2,
      name: "Blue"
    }
  };
  var record = {
    _id: 2,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 1);
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

test(subject + "adds busy and pendingUpdate", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.deepEqual(updated["2"].name, "Green");
  t.truthy(updated["2"].busy, "adds busy");
  t.truthy(updated["2"].pendingUpdate, "adds pendingUpdate");
});
