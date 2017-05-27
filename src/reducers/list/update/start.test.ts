import constants from "../../../constants";
import reducer from "./start";
import test from "ava";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};
var subject = constants.REDUCER_NAMES.UPDATE_START;

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue"
    },
    {
      id: 2,
      name: "Red"
    }
  ];
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

  t.is(updated.length, 3);
});

test(subject + "doesnt mutate the original", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(curr.length, 2);
  t.is(updated.length, 3);
});

test(subject + "updates existing", function(t) {
  var curr = getCurrent();
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.is(updated.length, 2);
  t.is(updated[1].id, 2);
  t.is(updated[1].name, "Green");
});

test(subject + "uses the given key", function(t) {
  var config = {
    key: "_id",
    resourceName: "users"
  };
  var curr = [
    {
      _id: 2,
      name: "Blue"
    }
  ];
  var record = {
    _id: 2,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(updated.length, 1);
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

  t.deepEqual(updated[1].name, "Green");
  t.truthy(updated[1].busy, "adds busy");
  t.truthy(updated[1].pendingUpdate, "adds pendingUpdate");
});
