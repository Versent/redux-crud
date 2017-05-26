import * as r from "ramda";
import test from "ava";

import constants from "../../../constants";
import reducer from "./success";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = constants.REDUCER_NAMES.FETCH_SUCCESS;

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

test(subject + " adds the records", function(t) {
  var curr = getCurrent();
  var more = [
    {
      id: 3,
      name: "Green"
    }
  ];
  var updated = reducer(config, curr, more, {});

  t.is(r.values(updated).length, 3);
});

test(subject + " doesnt mutate the original collection", function(t) {
  var curr = getCurrent();
  var more = [
    {
      id: 3,
      name: "Green"
    }
  ];
  var updated = reducer(config, curr, more, {});

  t.is(r.values(curr).length, 2);
  t.is(r.values(updated).length, 3);
});

test(subject + " merges", function(t) {
  var curr = getCurrent();
  var more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  var updated = reducer(config, curr, more, {});

  t.is(r.values(updated).length, 2);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
});

test(subject + " replaces", function(t) {
  const curr = getCurrent();
  const more = [
    {
      id: 2,
      name: "Green"
    }
  ];
  const updated = reducer(config, curr, more, {}, true);

  t.is(r.values(updated).length, 1);
  t.is(updated["2"].id, 2);
  t.is(updated["2"].name, "Green");
});

test(subject + " uses the given key", function(t) {
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
  var more = [
    {
      _id: 2,
      name: "Green"
    }
  ];

  var updated = reducer(config, curr, more, {});

  t.is(r.values(updated).length, 1);
});

test(subject + " it throws when records dont have an id", function(t) {
  var curr = getCurrent();
  var more = [
    {
      name: "Green"
    }
  ];

  var f = function() {
    reducer(config, curr, more, {});
  };
  t.throws(f);
});

test(subject + " can take one record", function(t) {
  var curr = getCurrent();
  var one = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, one, {});

  t.is(r.values(updated).length, 3);
});
