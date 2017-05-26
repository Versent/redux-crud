import test from "ava";
import * as r from "ramda";

import constants from "../../../constants";
import reducer from "./error";

var subject = constants.REDUCER_NAMES.CREATE_ERROR;
var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue"
    },
    {
      id: "abc",
      name: "Green"
    }
  ];
}

test(subject + "throws if given an array", function(t) {
  var curr = getCurrent();
  var created = [];

  function fn() {
    reducer(config, curr, created);
  }

  t.throws(fn, TypeError);
});

test(subject + "removes the record", function(t) {
  var curr = getCurrent();
  var created = {
    id: "abc",
    name: "Green"
  };
  var updated = reducer(config, curr, created);

  t.deepEqual(updated.length, 1);
});
