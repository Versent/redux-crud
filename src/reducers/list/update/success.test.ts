import constants from "../../../constants";
import reducer from "./success";
import test from "ava";

var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

var subject = constants.REDUCER_NAMES.UPDATE_SUCCESS;

function getCurrent() {
  return [
    {
      id: 1,
      name: "Blue",
      unsaved: true,
      busy: true
    },
    {
      id: 2,
      name: "Red",
      unsaved: true,
      busy: true
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

test(subject + "doesnt mutate the original collection", function(t) {
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

test(subject + "removes busy and pendingUpdate", function(t) {
  var curr = [
    {
      id: 2,
      name: "Green",
      pendingUpdate: true,
      busy: true
    }
  ];
  var record = getValid();
  var updated = reducer(config, curr, record);

  t.deepEqual(updated.length, 1);
  t.truthy(updated[0].busy == null, "removes busy");
  t.truthy(updated[0].pendingUpdate == null, "removes pendingUpdate");
});
