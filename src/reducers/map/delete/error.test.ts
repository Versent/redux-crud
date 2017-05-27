import * as r from "ramda";
import test from "ava";

import constants from "../../../constants";
import reducer from "./error";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = constants.REDUCER_NAMES.DELETE_ERROR;

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue",
      deleted: true,
      busy: true
    },
    2: {
      id: 2,
      name: "Red",
      deleted: true,
      busy: true
    }
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

test(subject + "doesnt mutate", function(t) {
  var curr = getCurrent();
  var record = {
    id: 1
  };

  var updated = reducer(config, curr, record);

  t.is(curr["1"].deleted, true);
  t.is(curr["1"].busy, true);
  t.is(updated["1"].deleted, undefined);
  t.is(updated["1"].busy, undefined);
});

test(subject + "removes deleted and busy", function(t) {
  var curr = getCurrent();
  var record = {
    id: 1
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 2, "doesnt remove record");
  t.truthy(updated["1"].deleted == null, "removes deleted");
  t.truthy(updated["1"].busy == null, "removes busy");

  t.truthy(updated["2"].deleted, "doesnt removes deleted from others");
  t.truthy(updated["2"].busy, "doesnt removes busy from others");
});

test(subject + "uses the given key", function(t) {
  var config = {
    key: "_id",
    resourceName: "users"
  };
  var curr = {
    1: {
      _id: 1,
      deleted: true,
      busy: true
    }
  };
  var record = {
    _id: 1
  };
  var updated = reducer(config, curr, record);

  t.truthy(updated["1"].deleted == null, "removes deleted");
  t.truthy(updated["1"].busy == null, "removes busy");
});

test(subject + "it throws when record doesnt have an id", function(t) {
  var curr = getCurrent();
  var record = {
    name: "Green"
  };

  var f = function() {
    reducer(config, curr, record);
  };
  t.throws(f);
});
