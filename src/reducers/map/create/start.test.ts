import * as r from "ramda";
import test from "ava";

import constants from "../../../constants";
import reducer from "./start";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = constants.REDUCER_NAMES.CREATE_START;

function getCurrent() {
  return {
    1: {
      id: 1,
      name: "Blue"
    },
    2: {
      id: "abc",
      name: "Green"
    }
  };
}

function getValid() {
  return {
    id: 3,
    name: "Green"
  };
}

test(subject + " throws if given an array", function(t) {
  var curr = getCurrent();
  var created = [];
  function fn() {
    reducer(config, curr, created);
  }

  t.throws(fn, TypeError);
});

test(subject + " adds the new record", function(t) {
  var curr = getCurrent();

  var other = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, other);

  t.is(r.values(updated).length, 3, "adds the record");
});

test(subject + "it throws when record doesnt have an id", function(t) {
  var curr = getCurrent();
  var record = {
    name: "Green"
  };

  var f = function() {
    reducer(config, curr, record);
  };
  t.throws(f, /users.createStart: Expected record to have .id/);
});

test(subject + "adds busy and pendingCreate", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.is(updated["3"].name, "Green");
  t.truthy(updated["3"].busy, "adds busy");
  t.truthy(updated["3"].pendingCreate, "adds pendingCreate");
});
