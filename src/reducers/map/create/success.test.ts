import * as r from "ramda";
import test from "ava";

import constants from "../../../constants";
import reducer from "./success";

var subject = constants.REDUCER_NAMES.CREATE_SUCCESS;
var config = {
  key: constants.DEFAULT_KEY,
  resourceName: "users"
};

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

test(subject + " it throws if it cannot find config.key", function(t) {
  var curr = getCurrent();
  var record = {};
  var config = {
    resourceName: "users"
  };
  var f = function() {
    reducer(config, curr, record);
  };
  t.throws(f, /users.createSuccess: Expected config.key/);
});

test(subject + " doesn't mutate the original collection", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 3);
  t.is(r.values(curr).length, 2);
});

test(subject + " throws if given an array", function(t) {
  var curr = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, TypeError);
});

test(subject + " adds the record", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);
  var actual = r.keys(updated);
  var expected = ["1", "2", "3"];

  t.deepEqual(actual, expected);
});

test(subject + " doesn't mutate the given record", function(t) {
  var curr = getCurrent();

  function getRecord() {
    return {
      busy: true,
      id: 3,
      name: "Green"
    };
  }
  var original = getRecord();
  var expected = getRecord();

  var updated = reducer(config, curr, original);

  t.deepEqual(original, expected);
});

test(subject + " merges if exists", function(t) {
  var curr = getCurrent();
  var record = {
    id: 2,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 2);
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
  var record = {
    _id: 2,
    name: "Green"
  };

  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 1);
});

test(subject + " it throws when record doesn't have an id", function(t) {
  var curr = getCurrent();
  var record = {
    name: "Green"
  };

  var f = function() {
    reducer(config, curr, record);
  };
  t.throws(f, /users.createSuccess: Expected record to have .id/);
});

test(subject + " it uses the cid to merge the record", function(t) {
  var cid = "abc";
  var curr = {
    [cid]: {
      id: cid,
      name: "Green"
    }
  };
  var record = {
    id: 3,
    name: "Green"
  };

  var updated = reducer(config, curr, record, cid);
  var actualKeys = r.keys(updated);
  var expectedKeys = ["3"]; // Verify that key was updated too

  // Verify that the record was merged
  t.same(updated["3"], {
    ...record
  });

  t.same(actualKeys, expectedKeys);
});

test(subject + " cleans the cid", function(t) {
  var cid = "abc";
  var curr = {
    [cid]: {
      id: cid,
      name: "Green"
    }
  };

  var record = {
    id: 3,
    name: "Green"
  };

  var updated = reducer(config, curr, record, cid);
  var updatedRecord = updated["3"];

  t.same(updatedRecord._cid, undefined);
});

test(subject + " removes busy and pendingCreate", function(t) {
  var curr = {
    2: {
      busy: true,
      id: 2,
      name: "Green",
      pendingCreate: true
    }
  };
  var record = {
    id: 2,
    name: "Yellow"
  };
  var updated = reducer(config, curr, record);

  t.is(r.values(updated).length, 1);
  t.truthy(updated["2"].busy == null, "removes busy");
  t.truthy(updated["2"].pendingCreate == null, "removes pendingCreate");
});
