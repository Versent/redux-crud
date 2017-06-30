import constants from "../../../constants";
import reducer from "./success";
import test from "ava";

var subject = "createSuccess: ";
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
      id: 2,
      name: "Red"
    }
  ];
}

test(subject + "it throws if it cannot find config.key", function(t) {
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

test(subject + "doesnt mutate the original collection", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(curr.length, 2);
});

test(subject + "throws if given an array", function(t) {
  var curr = getCurrent();
  var record = [];
  function fn() {
    reducer(config, curr, record);
  }

  t.throws(fn, TypeError);
});

test(subject + "adds the record", function(t) {
  var curr = getCurrent();
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record);

  t.is(updated.length, 3);
});

test(subject + "merges if exists", function(t) {
  var curr = getCurrent();
  var record = {
    id: 2,
    name: "Green"
  };
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

test(subject + "it throws when record doesnt have an id", function(t) {
  var curr = getCurrent();
  var record = {
    name: "Green"
  };

  var f = function() {
    reducer(config, curr, record);
  };
  t.throws(f, /users.createSuccess: Expected record to have .id/);
});

test(subject + "it uses the cid", function(t) {
  var cid = "abc";
  var curr = [
    {
      id: cid,
      name: "Blue"
    }
  ];
  var record = {
    id: 3,
    name: "Green"
  };
  var updated = reducer(config, curr, record, cid);
  t.is(updated.length, 1);
});

test(subject + " cleans the cid", function(t) {
  var cid = "abc";
  var curr = [
    {
      id: cid,
      name: "Blue"
    }
  ];

  var record = {
    id: 3,
    name: "Green"
  };

  var updated = reducer(config, curr, record, cid);
  var updatedRecord = updated[0];

  t.is(updatedRecord._cid, undefined);
});

test(subject + "removes busy and pendingCreate", function(t) {
  var curr = [
    {
      busy: true,
      id: 2,
      name: "Green",
      pendingCreate: true
    }
  ];
  var record = {
    id: 2,
    name: "Yellow"
  };
  var updated = reducer(config, curr, record);

  t.is(updated.length, 1);
  t.truthy(updated[0].busy == null, "removes busy");
  t.truthy(updated[0].pendingCreate == null, "removes pendingCreate");
});
